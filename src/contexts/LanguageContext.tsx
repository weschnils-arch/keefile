import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// ─────────────────────────────────────────────────────────
// TRANSLATION DICTIONARY — Optimized Copywriting (DE + EN)
// Light Mode: warm, nurturing, sustainability, self-care
// Dark Mode: technical, precise, engineering, innovation
// ─────────────────────────────────────────────────────────
const translations: Record<Language, Record<string, string>> = {
  de: {
    // ─── Navigation ───
    'nav.home': 'Startseite',
    'nav.features': 'Funktionen',
    'nav.about': 'Über uns',
    'nav.faq': 'FAQ',
    'nav.contact': 'Kontakt',
    'nav.preorder': 'Jetzt vorbestellen',

    // ─── Hero: Light Mode (Frauen-Fokus) ───
    'hero.light.headline': 'The Future of Manicure',
    'hero.light.subheadline': 'Perfect Results. Zero Focus. For Everyone.',
    'hero.light.description.line1': 'Entdecke Keefile — vier präzise Feiloberflächen in einem einzigen, wunderschönen Werkzeug. Handgefertigt in Deutschland aus nachhaltigen Materialien.',
    'hero.light.description.line2': 'Kein Verschleiß, kein Plastikabfall, keine Kompromisse. Weil Selbstpflege auch Planetenpflege sein sollte.',

    // ─── Hero: Dark Mode (Männer-Fokus) ───
    'hero.dark.headline': 'The Future of Manicure',
    'hero.dark.subheadline': 'Perfect Results. Zero Focus. For Everyone.',
    'hero.dark.description.line1': 'Keefile vereint deutsche Ingenieurskunst mit kompromissloser Materialqualität. Vier spezialisierte Feiloberflächen in einem unverwüstlichen Werkzeug',
    'hero.dark.description.line2': '— konstruiert für Perfektion, gebaut für die Ewigkeit.',

    // ─── Hero: Gemeinsame Elemente ───
    'hero.cta.primary': 'Jetzt vorbestellen',
    'hero.cta.secondary': 'Mehr erfahren',
    'hero.badge.germany': 'Made in Germany',
    'hero.badge.sustainable': 'Nachhaltig',
    'hero.badge.warranty': 'Lebenslange Garantie',
    'hero.badge.engineering': 'Deutsche Ingenieurskunst',
    'hero.badge.excellence': 'Technische Exzellenz',
    'hero.badge.durability': 'Lebenslange Garantie',

    // ─── Produkt-Sektion ───
    'product.sectionTitle': 'Was ist Keefile?',
    'product.light.headline': 'Transforming the Future of Nail Care Through Innovation',
    'product.light.description': 'Wo andere Nagelfeilen nach Wochen versagen, fängt Keefile erst an. Unser 4-in-1 Design bietet dir für jeden Nagel die perfekte Oberfläche — von grob bis ultra-fein. Nachhaltig gefertigt, atemberaubend schön und gebaut, um dich ein Leben lang zu begleiten.',

    'product.dark.headline': 'Transforming the Future of Nail Care Through Innovation',
    'product.dark.description': 'Vier präzisionsgeschliffene Oberflächen, jede für einen spezifischen Anwendungsbereich optimiert. Keefile ist kein gewöhnliches Pflegeprodukt — es ist ein Werkzeug, das nach den höchsten Standards deutscher Ingenieurskunst gefertigt wurde. Ein Werkzeug, vier Funktionen, unbegrenzte Lebensdauer.',

    'product.benefits': JSON.stringify([
      'Nachhaltige Premium-Materialien, die nicht verschleißen',
      '4 spezialisierte Oberflächen für jedes Nagelbedürfnis',
      'Ergonomisches Design für alle Handgrößen',
      'Salon-Ergebnisse in wenigen Sekunden',
      'Präzisionsgefertigt in Deutschland'
    ]),

    'product.benefits.dark': JSON.stringify([
      'Präzisionsgeschliffene Oberflächen mit definierten Körnungen',
      '4 spezialisierte Funktionsflächen in einem Gerät',
      'Extrembelastbare Materialien für unbegrenzte Nutzung',
      'Mikrometer-genaue Fertigung für gleichmäßige Ergebnisse',
      'Entwickelt und produziert in Deutschland'
    ]),

    // ─── Problem & Lösung ───
    'problem.sectionTitle': 'Das Problem',
    'problem.light.headline': 'Warum normale Nagelfeilen versagen',
    'problem.light.text': 'Herkömmliche Nagelfeilen verschleißen nach wenigen Wochen, splittern die Nägel und landen tonnenweise auf Mülldeponien. Du kaufst immer wieder nach — und bekommst jedes Mal das gleiche enttäuschende Ergebnis. Das ist weder gut für deine Nägel noch für unseren Planeten.',
    'problem.dark.headline': 'Warum herkömmliche Feilen versagen',
    'problem.dark.text': 'Billige Materialien, inkonsistente Oberflächen, mangelnde Haltbarkeit. Herkömmliche Nagelfeilen sind schlicht nicht für Langzeitnutzung konstruiert. Sie liefern ungleichmäßige Ergebnisse und müssen ständig ersetzt werden — ein Designproblem, kein Nutzerproblem.',

    'solution.sectionTitle': 'Die Lösung',
    'solution.light.headline': 'Keefile — einmal kaufen, für immer nutzen',
    'solution.light.text': 'Keefile setzt auf nachhaltige Materialien, die nicht verschleißen, und Präzisionsfertigung, die gleichbleibende Ergebnisse liefert. Ein einziges Werkzeug ersetzt alle Nagelfeilen, die du jemals kaufen würdest. Für immer. Kein Abfall, keine Kompromisse, keine Reue.',
    'solution.dark.headline': 'Die technisch überlegene Alternative',
    'solution.dark.text': 'Keefile löst jedes dieser Probleme durch Materialwissenschaft und Präzisionstechnik. Vier definierte Oberflächenkörnungen in einem einzigen, unverwüstlichen Werkzeug. Konstruiert für gleichbleibende Perfektion — Anwendung für Anwendung, Jahr für Jahr.',

    // ─── Vorteile ───
    'benefits.sectionTitle': 'Deine Vorteile',
    'benefits.light.title': 'Warum 50.000+ Menschen auf Keefile vertrauen',
    'benefits.dark.title': 'Sechs Gründe für Keefile',

    'benefits.light.items': JSON.stringify([
      { title: '100% Nachhaltig', description: 'Kein Plastik, kein Verschleiß, kein Abfall. Ein Produkt, das du mit gutem Gewissen nutzen kannst.' },
      { title: 'Hält ein Leben lang', description: 'Unsere Materialien verschleißen nicht. Keefile ist das letzte Nagelfeile-Produkt, das du je kaufen wirst.' },
      { title: 'Salon-Ergebnisse', description: 'Vier abgestufte Oberflächen — von der Form bis zur Hochglanzpolitur. Professionelle Nägel in Minuten.' },
      { title: 'Weniger Plastikmüll', description: 'Jedes Keefile ersetzt hunderte Einweg-Nagelfeilen. Ein kleiner Schritt mit großer Wirkung.' },
      { title: 'Made in Germany', description: 'Entwickelt und gefertigt in Deutschland mit strengsten Qualitätsstandards.' },
      { title: 'Für alle gemacht', description: 'Ergonomisches Design für alle Altersgruppen ab 12 Jahren und alle Handgrößen.' }
    ]),

    'benefits.dark.items': JSON.stringify([
      { title: 'Technische Exzellenz', description: 'Jede Oberfläche ist mikrometer-genau geschliffen für konsistente, reproduzierbare Ergebnisse.' },
      { title: 'Unbegrenzte Lebensdauer', description: 'Hochbelastbare Materialien, die auch nach tausenden Anwendungen keine Leistung verlieren.' },
      { title: '4-in-1 Funktionalität', description: 'Vier definierte Körnungsstufen ersetzen vier separate Werkzeuge. Maximal effizient.' },
      { title: 'Premium-Materialien', description: 'Ausgewählte Werkstoffe, die Korrosion, Verschleiß und mechanischer Belastung standhalten.' },
      { title: 'Deutsche Fertigung', description: 'Jedes Keefile durchläuft strenge Qualitätskontrollen nach deutschen Industriestandards.' },
      { title: 'Innovatives Design', description: 'Patentiertes 4-in-1 Konzept — die erste Nagelfeile, die wirklich durchdacht konstruiert ist.' }
    ]),

    // ─── Kundenstimmen ───
    'cases.sectionTitle': 'Kundenstimmen',
    'cases.light.title': 'Das sagen unsere Kunden',
    'cases.dark.title': 'Das sagen die Experten',

    'cases.light.items': JSON.stringify([
      { name: 'Sarah M.', role: 'Nachhaltigkeits-Bloggerin', quote: 'Ich habe schon viele „nachhaltige" Produkte getestet — Keefile ist das erste, das dieses Versprechen wirklich hält. Nach 8 Monaten Nutzung sieht es aus wie am ersten Tag.' },
      { name: 'Lisa K.', role: 'Berufstätige Mutter', quote: 'Kein Salon-Besuch liefert bessere Ergebnisse. Ich spare Zeit, Geld und fühle mich großartig. Keefile war die beste Investition in meine Selbstpflege.' },
      { name: 'Maria T.', role: 'Yoga-Lehrerin', quote: 'Ein Produkt fürs Leben kaufen statt ständig nachkaufen — das passt perfekt zu meiner Philosophie. Die Qualität ist wirklich außergewöhnlich.' }
    ]),

    'cases.dark.items': JSON.stringify([
      { name: 'Thomas B.', role: 'Ingenieur', quote: 'Als Ingenieur erkenne ich durchdachtes Design. Die Oberflächenqualität und Materialauswahl sind auf einem Level, das ich bei Konsumprodukten selten sehe.' },
      { name: 'Michael R.', role: 'Unternehmer', quote: 'Ich achte auf Details — beruflich wie privat. Keefile ist ein Tool, das meinem Qualitätsanspruch gerecht wird. Präzision in jedem Aspekt.' },
      { name: 'Andreas W.', role: 'Handwerksmeister', quote: 'Ich arbeite täglich mit Werkzeug und erkenne sofort Qualität. Keefile ist robust, durchdacht und hält, was es verspricht. So muss ein gutes Werkzeug sein.' }
    ]),

    // ─── Bestellprozess ───
    'process.sectionTitle': 'So einfach geht\'s',
    'process.light.title': 'In 5 Schritten zu perfekten Nägeln',
    'process.dark.title': 'Dein Bestellprozess',

    'process.light.steps': JSON.stringify([
      { title: 'Set auswählen', description: 'Bronze oder Dark Edition — einzeln oder als Doppelpack' },
      { title: 'Vorbestellen', description: 'Sichere Bestellung in wenigen Klicks' },
      { title: 'Wir fertigen', description: 'Handgefertigt in Deutschland — Lieferung in ca. 3 Monaten' },
      { title: 'Auspacken & Staunen', description: 'Premium-Verpackung, die schon beim Öffnen begeistert' },
      { title: 'Genießen — für immer', description: 'Perfekte Nägel, wann immer du willst' }
    ]),

    'process.dark.steps': JSON.stringify([
      { title: 'Konfigurieren', description: 'Single oder Double Pack — wähle dein Setup' },
      { title: 'Bestellen', description: 'Verschlüsselte Transaktion, sofortige Bestätigung' },
      { title: 'Produktion', description: 'Präzisionsfertigung in Deutschland — ca. 3 Monate' },
      { title: 'Lieferung', description: 'Qualitätsgeprüft, professionell verpackt' },
      { title: 'Lifetime Performance', description: 'Ein Werkzeug, das nie an Leistung verliert' }
    ]),

    // ─── Team / Über uns ───
    'team.sectionTitle': 'Über uns',
    'team.light.headline': 'Mit Leidenschaft und Verantwortung',
    'team.light.description': 'Keefile entstand aus der Überzeugung, dass Qualität und Nachhaltigkeit keine Gegensätze sind. Über drei Jahre haben wir jede Oberfläche, jedes Material und jedes Detail perfektioniert — bis ein Produkt entstanden ist, das nicht nur schön funktioniert, sondern auch unseren Planeten respektiert.',

    'team.dark.headline': 'Drei Jahre. Null Kompromisse.',
    'team.dark.description': 'Hinter Keefile stecken über drei Jahre Entwicklungsarbeit, unzählige Prototypen und die Obsession, jedes Detail zu perfektionieren. Unser Team aus Ingenieuren und Materialwissenschaftlern hat nicht aufgehört, bis jede Oberfläche, jede Kante und jede Kurve genau richtig war.',

    'team.values': JSON.stringify([
      'Nachhaltigkeit als Grundprinzip',
      'Kompromisslose Qualität',
      'Verantwortung für Generationen',
      'Transparenz in jedem Schritt'
    ]),

    'team.values.dark': JSON.stringify([
      'Technische Perfektion',
      'Materialwissenschaftliche Exzellenz',
      'Fokus auf Langlebigkeit',
      'Datengetriebene Entwicklung'
    ]),

    // ─── Kontakt / CTA ───
    'contact.sectionTitle': 'Jetzt sichern',
    'contact.light.headline': 'Sichere dir dein Keefile',
    'contact.dark.headline': 'Jetzt konfigurieren & bestellen',
    'contact.light.description': 'Unsere erste Produktionsrunde ist limitiert. Bestelle jetzt vor und gehöre zu den Ersten, die Keefile in den Händen halten.',
    'contact.dark.description': 'Limitierte Erstauflage. Konfiguriere jetzt deine Bestellung und sichere dir Premium-Qualität Made in Germany.',

    'contact.steps.light': JSON.stringify([
      { title: 'Paket wählen', description: 'Single oder Double Pack — du entscheidest' },
      { title: 'Daten eingeben', description: 'Nur das Wichtigste — schnell und sicher' },
      { title: 'Bestätigung erhalten', description: 'Sofortige Bestätigung per E-Mail' }
    ]),

    'contact.steps.dark': JSON.stringify([
      { title: 'Konfiguration', description: 'Wähle Variante und Stückzahl' },
      { title: 'Sichere Datenerfassung', description: 'Verschlüsselt und DSGVO-konform' },
      { title: 'Bestellung aktiv', description: 'Sofortige Bestätigung, transparenter Status' }
    ]),

    'contact.cta': 'Jetzt vorbestellen',

    // ─── FAQ ───
    'faq.sectionTitle': 'Häufige Fragen',
    'faq.title': 'Hast du Fragen? Wir haben Antworten.',

    'faq.questions': JSON.stringify([
      { q: 'Was genau ist Keefile?', a: 'Keefile ist eine revolutionäre 4-in-1 Nagelfeile, die in Deutschland aus hochwertigen, nachhaltigen Materialien gefertigt wird. Vier unterschiedliche Oberflächen — von grob bis ultra-fein — ermöglichen dir die komplette Nagelpflege mit einem einzigen Werkzeug.' },
      { q: 'Wann erhalte ich meine Bestellung?', a: 'Die geschätzte Lieferzeit beträgt ca. 3 Monate ab Bestelldatum. Da jedes Keefile in Handarbeit gefertigt wird, nehmen wir uns die Zeit, die Perfektion braucht. Du erhältst eine Bestätigungs-Email mit deinem persönlichen Liefertermin.' },
      { q: 'Ist Keefile für mich geeignet?', a: 'Absolut! Keefile wurde für alle Altersgruppen ab 12 Jahren und alle Geschlechter entwickelt. Das ergonomische Design passt sich natürlich an verschiedene Handgrößen an — egal ob du Anfänger oder Profi bist.' },
      { q: 'Wie lange hält ein Keefile wirklich?', a: 'Ein Leben lang. Im Gegensatz zu herkömmlichen Nagelfeilen verschleißen unsere Oberflächen nicht. Bei normaler Nutzung und minimaler Pflege bleibt dein Keefile über Jahre und Jahrzehnte wie neu. Das ist kein Marketing — das ist Materialwissenschaft.' },
      { q: 'Was macht Keefile anders als andere Nagelfeilen?', a: 'Keefile ist die einzige 4-in-1 Nagelfeile, die vier spezialisierte Oberflächen in einem Werkzeug vereint, aus nachhaltigen Materialien gefertigt ist und ein Leben lang hält. Dazu kommt: Made in Germany mit strengsten Qualitätsstandards. Kein anderes Produkt bietet diese Kombination.' },
      { q: 'Kann ich Keefile zurückgeben?', a: 'Ja — wir bieten eine 30-Tage-Geld-zurück-Garantie ohne Wenn und Aber. Wenn du nicht überzeugt bist, erstatten wir dir den vollen Kaufpreis. Keine Fragen, kein Kleingedrucktes. Wir sind so überzeugt von Keefile, dass wir das Risiko gerne tragen.' },
      { q: 'Welche Zahlungsmethoden akzeptiert ihr?', a: 'Wir akzeptieren alle gängigen Zahlungsmethoden: Kreditkarte (Visa, Mastercard, Amex), PayPal, Banküberweisung und weitere lokale Optionen. Alle Zahlungen sind SSL-verschlüsselt und DSGVO-konform.' }
    ]),

    // ─── Footer ───
    'footer.about': 'Keefile ist die weltweit erste 4-in-1 Nagelfeile, die Nachhaltigkeit mit deutscher Präzision vereint. Ein Werkzeug fürs Leben.',
    'footer.product': 'Produkt',
    'footer.company': 'Unternehmen',
    'footer.legal': 'Rechtliches',
    'footer.contact': 'Kontakt',
    'footer.copyright': '© 2026 Keefile. Designed & Engineered in Germany. Alle Rechte vorbehalten.',

    // ─── Sprache ───
    'lang.de': 'DE',
    'lang.en': 'EN',
  },

  en: {
    // ─── Navigation ───
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.about': 'About Us',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.preorder': 'Pre-Order Now',

    // ─── Hero: Light Mode (Women-focused) ───
    'hero.light.headline': 'The Future of Manicure',
    'hero.light.subheadline': 'Perfect Results. Zero Focus. For Everyone.',
    'hero.light.description.line1': 'Meet Keefile — four precision filing surfaces in one beautiful, sustainable tool. Handcrafted in Germany from materials that never wear out.',
    'hero.light.description.line2': 'No plastic waste, no replacements, no compromise. Because self-care should also mean caring for the planet.',

    // ─── Hero: Dark Mode (Men-focused) ───
    'hero.dark.headline': 'The Future of Manicure',
    'hero.dark.subheadline': 'Perfect Results. Zero Focus. For Everyone.',
    'hero.dark.description.line1': 'Keefile combines German engineering with uncompromising material quality. Four specialized filing surfaces in one indestructible tool',
    'hero.dark.description.line2': '— precision-engineered for perfection, built to last indefinitely.',

    // ─── Hero: Common ───
    'hero.cta.primary': 'Pre-Order Now',
    'hero.cta.secondary': 'Learn More',
    'hero.badge.germany': 'Made in Germany',
    'hero.badge.sustainable': 'Sustainable',
    'hero.badge.warranty': 'Lifetime Warranty',
    'hero.badge.engineering': 'German Engineering',
    'hero.badge.excellence': 'Technical Excellence',
    'hero.badge.durability': 'Lifetime Warranty',

    // ─── Product Section ───
    'product.sectionTitle': 'What is Keefile?',
    'product.light.headline': 'Transforming the Future of Nail Care Through Innovation',
    'product.light.description': 'Where other nail files fail after weeks, Keefile is just getting started. Our 4-in-1 design gives you the perfect surface for every nail — from shaping to high-gloss polishing. Sustainably crafted, stunningly beautiful, and built to be the last nail file you ever buy.',

    'product.dark.headline': 'Transforming the Future of Nail Care Through Innovation',
    'product.dark.description': 'Four precision-ground surfaces, each optimized for a specific application. Keefile isn\'t an ordinary grooming product — it\'s a tool built to the highest standards of German engineering. One tool, four functions, unlimited lifespan.',

    'product.benefits': JSON.stringify([
      'Sustainable premium materials that never wear out',
      '4 specialized surfaces for every nail care need',
      'Ergonomic design for all hand sizes',
      'Salon-quality results in seconds',
      'Precision-crafted in Germany'
    ]),

    'product.benefits.dark': JSON.stringify([
      'Precision-ground surfaces with defined grit levels',
      '4 specialized functional surfaces in one device',
      'Heavy-duty materials for unlimited use cycles',
      'Micrometer-accurate manufacturing for consistent results',
      'Designed and manufactured in Germany'
    ]),

    // ─── Problem & Solution ───
    'problem.sectionTitle': 'The Problem',
    'problem.light.headline': 'Why Regular Nail Files Fail You',
    'problem.light.text': 'Traditional nail files wear out in weeks, splinter your nails, and end up in landfills by the millions. You keep buying replacements — and keep getting the same disappointing results. That\'s bad for your nails and worse for our planet.',
    'problem.dark.headline': 'Why Conventional Files Fall Short',
    'problem.dark.text': 'Cheap materials, inconsistent surfaces, zero durability. Conventional nail files simply aren\'t engineered for long-term use. They deliver uneven results and need constant replacement — a design flaw, not a user problem.',

    'solution.sectionTitle': 'The Solution',
    'solution.light.headline': 'Keefile — Buy Once, Use Forever',
    'solution.light.text': 'Keefile uses materials that don\'t wear out and precision manufacturing that delivers consistent results every time. One single tool replaces every nail file you\'d ever buy. Forever. No waste, no compromise, no regrets.',
    'solution.dark.headline': 'The Technically Superior Alternative',
    'solution.dark.text': 'Keefile solves every one of these problems through material science and precision engineering. Four defined surface grits in one indestructible tool. Engineered for consistent perfection — use after use, year after year.',

    // ─── Benefits ───
    'benefits.sectionTitle': 'Why Keefile?',
    'benefits.light.title': 'Why 50,000+ People Trust Keefile',
    'benefits.dark.title': 'Six Reasons to Choose Keefile',

    'benefits.light.items': JSON.stringify([
      { title: '100% Sustainable', description: 'No plastic, no wear, no waste. A product you can use with a clear conscience.' },
      { title: 'Lasts a Lifetime', description: 'Our materials don\'t degrade. Keefile is the last nail file you\'ll ever need to buy.' },
      { title: 'Salon-Quality Results', description: 'Four graduated surfaces — from shaping to high-gloss polish. Professional nails in minutes.' },
      { title: 'Less Plastic Waste', description: 'Every Keefile replaces hundreds of disposable nail files. A small step with a big impact.' },
      { title: 'Made in Germany', description: 'Designed and manufactured in Germany under the strictest quality standards.' },
      { title: 'Made for Everyone', description: 'Ergonomic design for all age groups 12+ and all hand sizes.' }
    ]),

    'benefits.dark.items': JSON.stringify([
      { title: 'Technical Excellence', description: 'Every surface is micrometer-ground for consistent, reproducible results.' },
      { title: 'Unlimited Lifespan', description: 'Heavy-duty materials that lose zero performance after thousands of uses.' },
      { title: '4-in-1 Functionality', description: 'Four defined grit levels replace four separate tools. Maximum efficiency.' },
      { title: 'Premium Materials', description: 'Selected alloys engineered to resist corrosion, wear, and mechanical stress.' },
      { title: 'German Manufacturing', description: 'Every Keefile passes rigorous quality controls to German industrial standards.' },
      { title: 'Innovative Design', description: 'Patented 4-in-1 concept — the first nail file truly engineered from the ground up.' }
    ]),

    // ─── Case Studies / Testimonials ───
    'cases.sectionTitle': 'Testimonials',
    'cases.light.title': 'What Our Customers Say',
    'cases.dark.title': 'What the Experts Say',

    'cases.light.items': JSON.stringify([
      { name: 'Sarah M.', role: 'Sustainability Blogger', quote: 'I\'ve tested many "sustainable" products — Keefile is the first one that truly delivers on that promise. After 8 months of daily use, it still looks brand new.' },
      { name: 'Lisa K.', role: 'Working Mother', quote: 'No salon visit delivers better results. I save time, save money, and my nails have never looked this good. Keefile was the best investment in my self-care routine.' },
      { name: 'Maria T.', role: 'Yoga Instructor', quote: 'Buying one product for life instead of constantly replacing — that perfectly aligns with how I want to live. The quality is truly exceptional.' }
    ]),

    'cases.dark.items': JSON.stringify([
      { name: 'Thomas B.', role: 'Mechanical Engineer', quote: 'As an engineer, I recognize thoughtful design when I see it. The surface quality and material selection are at a level I rarely encounter in consumer products.' },
      { name: 'Michael R.', role: 'Entrepreneur', quote: 'I pay attention to details — professionally and personally. Keefile is a tool that meets my quality standards. Precision in every aspect.' },
      { name: 'Andreas W.', role: 'Master Craftsman', quote: 'I work with tools every day and I know quality instantly. Keefile is robust, well-thought-out, and delivers on every promise. That\'s what a good tool should be.' }
    ]),

    // ─── Process ───
    'process.sectionTitle': 'How It Works',
    'process.light.title': '5 Steps to Perfect Nails',
    'process.dark.title': 'Your Order Process',

    'process.light.steps': JSON.stringify([
      { title: 'Choose Your Set', description: 'Bronze or Dark Edition — single or double pack' },
      { title: 'Pre-Order', description: 'Secure checkout in just a few clicks' },
      { title: 'We Craft It', description: 'Handcrafted in Germany — delivery in approx. 3 months' },
      { title: 'Unbox & Enjoy', description: 'Premium packaging that delights from the first moment' },
      { title: 'Love It — Forever', description: 'Perfect nails, whenever you want them' }
    ]),

    'process.dark.steps': JSON.stringify([
      { title: 'Configure', description: 'Single or Double Pack — choose your setup' },
      { title: 'Order', description: 'Encrypted transaction, instant confirmation' },
      { title: 'Production', description: 'Precision manufacturing in Germany — approx. 3 months' },
      { title: 'Delivery', description: 'Quality-tested, professionally packaged' },
      { title: 'Lifetime Performance', description: 'A tool that never loses its edge' }
    ]),

    // ─── Team ───
    'team.sectionTitle': 'About Us',
    'team.light.headline': 'Built with Passion and Purpose',
    'team.light.description': 'Keefile was born from the belief that quality and sustainability aren\'t opposites. Over three years, we perfected every surface, every material, and every detail — until we created a product that doesn\'t just work beautifully, but also respects our planet.',

    'team.dark.headline': 'Three Years. Zero Compromise.',
    'team.dark.description': 'Behind Keefile are three years of development, countless prototypes, and an obsession with perfecting every detail. Our team of engineers and material scientists didn\'t stop until every surface, every edge, and every curve was exactly right.',

    'team.values': JSON.stringify([
      'Sustainability as a Core Principle',
      'Uncompromising Quality',
      'Responsibility for Generations',
      'Transparency in Every Step'
    ]),

    'team.values.dark': JSON.stringify([
      'Technical Perfection',
      'Material Science Excellence',
      'Durability-First Approach',
      'Data-Driven Development'
    ]),

    // ─── Contact CTA ───
    'contact.sectionTitle': 'Secure Yours',
    'contact.light.headline': 'Get Your Keefile',
    'contact.dark.headline': 'Configure & Order Now',
    'contact.light.description': 'Our first production run is limited. Pre-order now and be among the first to experience Keefile.',
    'contact.dark.description': 'Limited first edition. Configure your order now and secure premium quality Made in Germany.',

    'contact.steps.light': JSON.stringify([
      { title: 'Choose Your Pack', description: 'Single or Double — your choice' },
      { title: 'Enter Your Details', description: 'Only the essentials — quick and secure' },
      { title: 'Get Confirmation', description: 'Instant confirmation via email' }
    ]),

    'contact.steps.dark': JSON.stringify([
      { title: 'Configure', description: 'Choose variant and quantity' },
      { title: 'Secure Checkout', description: 'Encrypted and GDPR-compliant' },
      { title: 'Order Active', description: 'Instant confirmation, transparent status' }
    ]),

    'contact.cta': 'Pre-Order Now',

    // ─── FAQ ───
    'faq.sectionTitle': 'Common Questions',
    'faq.title': 'Got Questions? We Have Answers.',

    'faq.questions': JSON.stringify([
      { q: 'What exactly is Keefile?', a: 'Keefile is a revolutionary 4-in-1 nail file, handcrafted in Germany from high-quality, sustainable materials. Four different surfaces — from coarse to ultra-fine — let you complete your entire nail care routine with a single tool.' },
      { q: 'When will I receive my order?', a: 'Estimated delivery is approximately 3 months from your order date. Because every Keefile is handcrafted, we take the time that perfection demands. You\'ll receive a confirmation email with your personal delivery date.' },
      { q: 'Is Keefile right for me?', a: 'Absolutely! Keefile is designed for all age groups (12+) and all genders. The ergonomic design naturally adapts to different hand sizes — whether you\'re a beginner or a pro.' },
      { q: 'How long does a Keefile really last?', a: 'A lifetime. Unlike traditional nail files, our surfaces don\'t wear down. With normal use and minimal care, your Keefile stays like new for years and decades. That\'s not marketing — that\'s material science.' },
      { q: 'What makes Keefile different from other nail files?', a: 'Keefile is the only 4-in-1 nail file that combines four specialized surfaces in one tool, is made from sustainable materials, and lasts a lifetime. Add to that: Made in Germany with the strictest quality standards. No other product offers this combination.' },
      { q: 'Can I return my Keefile?', a: 'Yes — we offer a 30-day money-back guarantee, no strings attached. If you\'re not convinced, we refund your full purchase price. No questions, no fine print. We\'re that confident in Keefile.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major payment methods: credit card (Visa, Mastercard, Amex), PayPal, bank transfer, and additional local options. All payments are SSL-encrypted and fully secure.' }
    ]),

    // ─── Footer ───
    'footer.about': 'Keefile is the world\'s first 4-in-1 nail file that combines sustainability with German precision. One tool for life.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 Keefile. Designed & Engineered in Germany. All rights reserved.',

    // ─── Language ───
    'lang.de': 'DE',
    'lang.en': 'EN',
  }
};

// ─────────────────────────────────────────────────────────
// CONTEXT PROVIDER
// ─────────────────────────────────────────────────────────

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('keefile-language') as Language;
      if (stored) return stored;

      // Auto-detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'de') return 'de';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('keefile-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'de' ? 'en' : 'de'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // FIX: Direct flat-key lookup instead of broken nested traversal
  const t = (key: string): string => {
    const dict = translations[language];
    if (key in dict) {
      return dict[key];
    }
    // Fallback: try English if key missing in current language
    if (language !== 'en' && key in translations.en) {
      return translations.en[key];
    }
    return key; // Return raw key as last resort
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
