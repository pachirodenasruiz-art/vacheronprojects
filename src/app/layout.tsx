import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vacheron Projects | Software Cloud Integral para Construcción y Gestión de Obras",
  description: "Plataforma SaaS líder para constructoras, promotoras y reformas. Control presupuestario en tiempo real, mediciones, Gantt, compras, analítica de desviaciones y cumplimiento Veri*Factu.",
  keywords: ["software construccion", "gestion de obras", "brickcontrol alternativa", "presupuestos bc3", "gantt obras", "control costes construccion", "verifactu construccion", "certificaciones obra"],
  openGraph: {
    title: "Vacheron Projects | ERP Cloud de Construcción",
    description: "Control integral de costes, ejecución en obra y cumplimiento Veri*Factu en una única plataforma colaborativa.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#070b14] text-slate-100 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-300">
        {children}
      </body>
    </html>
  );
}
