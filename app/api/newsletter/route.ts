import { NextRequest, NextResponse } from "next/server";

// You'll need to install @sendgrid/mail: npm install @sendgrid/mail
// import sgMail from '@sendgrid/mail';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validate the input
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send data to external API (Google Sheets integration)
    try {
      const integrationResponse = await fetch(process.env.INTEGRATION_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      if (!integrationResponse.ok) {
        console.error("Failed to send data to integration API:", {
          status: integrationResponse.status,
          statusText: integrationResponse.statusText,
        });
        // Continue execution even if external API fails
      } else {
        console.log("Successfully sent data to integration API");
      }
    } catch (integrationError) {
      console.error("Error calling integration API:", integrationError);
      // Continue execution even if external API fails
    }

    // Send welcome email using SendGrid
    // Uncomment and configure once SendGrid is set up
    /*
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!, // Your verified sender email
      subject: 'Welcome to Página 128!',
      text: `Hola ${name}, thanks for subscribing to our newsletter!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e91e63;">¡Bienvenido a Página 128!</h2>
          <p>Hola ${name},</p>
          <p>Gracias por suscribirte a nuestra newsletter. Te mantendremos informado sobre la apertura de nuestra librería en Gràcia y todos nuestros eventos especiales.</p>
          <p>¡Nos vemos pronto!</p>
          <p style="color: #666;">El equipo de Página 128</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    */

    // Log the submission
    console.log("Newsletter signup:", {
      name,
      email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
