"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { useDictionary } from "@/components/DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

const faqData_fr = {
  "Généralités": [
    { q: "Qu'est-ce que FinancePro ?", a: "FinancePro est un Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP) enregistré à l'ORIAS sous le n° 00-000-000. Nous mettons en relation les particuliers et professionnels avec des établissements de crédit partenaires agréés par l'ACPR, pour vous offrir les meilleures conditions de financement." },
    { q: "Êtes-vous un établissement de crédit agréé ?", a: "Non. FinancePro n'est pas un établissement de crédit. Nous sommes un intermédiaire agréé (IOBSP) qui vous met en relation avec des établissements prêteurs. Nos partenaires bancaires sont, eux, agréés par l'ACPR. Notre enregistrement ORIAS est vérifiable sur www.orias.fr." },
    { q: "Dans quels délais puis-je obtenir une réponse ?", a: "Vous recevez une réponse de principe sous 24 heures ouvrées après dépôt d'un dossier complet. En cas de dossier incomplet, un conseiller vous contacte pour obtenir les documents manquants. Le versement des fonds intervient sous 48 heures après signature et à l'issue du délai légal." },
    { q: "Quels sont vos horaires d'ouverture ?", a: "Notre équipe est disponible du lundi au vendredi de 9h à 18h, et le samedi de 9h à 12h. En dehors de ces horaires, notre assistant virtuel répond à vos questions fréquentes et vous pouvez déposer une demande à tout moment via notre site." },
    { q: "Mes données sont-elles en sécurité ?", a: "Oui. Nous utilisons le chiffrement TLS 1.3 pour les communications et AES-256 pour le stockage. Vos données sont hébergées en Union Européenne et ne sont jamais vendues à des tiers. Nous sommes conformes au RGPD. Consultez notre Politique de Confidentialité pour plus de détails." },
    { q: "Puis-je faire une demande si je suis fiché FICP ?", a: "Si vous êtes inscrit au Fichier des Incidents de Crédit aux Particuliers (FICP), l'accès au crédit est réglementairement limité. Nous sommes légalement tenus de consulter ce fichier. Nous vous invitons à vous rapprocher d'un conseiller pour étudier votre situation particulière." },
    { q: "Y a-t-il des frais de dossier ?", a: "La simulation et l'étude de votre dossier sont entièrement gratuites. FinancePro est rémunéré par les établissements prêteurs sous forme de commission. Des frais de dossier peuvent être facturés par l'établissement prêteur et seront clairement indiqués dans l'offre de crédit, avant toute signature." },
    { q: "Comment contacter un conseiller ?", a: "Par téléphone au 01 00 00 00 00 (non surtaxé, lun-ven 9h-18h), par email à contact@financepro.fr, via le formulaire de contact, le chat en ligne sur le site, ou depuis votre espace client. Temps de réponse garanti : 24 heures ouvrées." },
  ],
  "Simulation": [
    { q: "La simulation engage-t-elle ma responsabilité ?", a: "Non. La simulation est un outil indicatif, gratuit et sans engagement. Elle ne constitue pas une offre de crédit et ne crée aucune obligation. Vous pouvez simuler autant de fois que vous le souhaitez, modifier les paramètres librement." },
    { q: "Pourquoi le taux affiché est-il indicatif ?", a: "Le taux indicatif est calculé sur la base des paramètres que vous saisissez. Le TAEG définitif est déterminé après analyse complète de votre dossier (revenus, charges, historique bancaire, montant, durée). Il sera communiqué dans l'offre de contrat de crédit, conformément à la loi." },
    { q: "Puis-je refaire une simulation ?", a: "Oui, vous pouvez effectuer autant de simulations que vous souhaitez, à tout moment, gratuitement et sans vous identifier. Chaque simulation est indépendante et n'a aucun impact sur votre score de crédit." },
    { q: "À quoi correspond le TAEG ?", a: "Le Taux Annuel Effectif Global (TAEG) représente le coût total de votre crédit exprimé en pourcentage annuel. Il intègre le taux d'intérêt nominal, les frais de dossier et toute autre charge obligatoire liée au crédit. C'est l'indicateur de comparaison légalement imposé (art. L314-1 Code de la consommation)." },
    { q: "Comment est calculée ma mensualité ?", a: "Votre mensualité est calculée selon la formule actuarielle standard : M = P × [r(1+r)^n] / [(1+r)^n - 1], où P = capital, r = taux mensuel (taux annuel / 12) et n = nombre de mensualités. Cette formule est identique pour tous les établissements de crédit français." },
  ],
  "Demande de prêt": [
    { q: "Quels documents dois-je fournir ?", a: "Les documents standards sont : pièce d'identité (CNI ou passeport), 3 derniers bulletins de salaire ou 2 derniers bilans, 3 derniers relevés bancaires, justificatif de domicile de moins de 3 mois, et RIB. Des documents supplémentaires peuvent être demandés selon la nature de votre projet." },
    { q: "Puis-je faire une demande en couple ?", a: "Oui, vous pouvez faire une demande en co-emprunteur (conjoint, partenaire de PACS, concubin). Les deux revenus sont pris en compte, ce qui peut améliorer votre capacité d'emprunt. Chaque co-emprunteur devra fournir les documents justificatifs de sa situation." },
    { q: "Ma demande sera-t-elle visible sur mes relevés bancaires ?", a: "La simulation n'apparaît pas sur vos relevés. Lors de l'étude complète du dossier, nous consultons le FICP (Fichier des Incidents de Crédit aux Particuliers) de la Banque de France. Cette consultation est discrète et n'impacte pas votre score bancaire." },
    { q: "Que se passe-t-il si ma demande est refusée ?", a: "En cas de refus, nous vous en informons par écrit. Vous pouvez demander les motifs du refus (dans les limites légales). Un refus n'est pas définitif : vous pouvez représenter votre dossier après un délai de 3 mois ou si votre situation évolue. Des recours existent si vous estimez le refus injustifié." },
    { q: "Puis-je annuler ma demande ?", a: "Oui, à tout moment avant la signature de l'offre de crédit. Après signature, vous disposez d'un délai légal de rétractation de 14 jours calendaires (art. L312-19 Code de la consommation), sans frais ni pénalités." },
    { q: "Mon dossier sera-t-il étudié par un humain ?", a: "Oui. Nos conseillers examinent chaque dossier personnellement. Des outils d'aide à la décision peuvent être utilisés pour une première analyse, mais la décision finale implique toujours une intervention humaine. Conformément à l'art. 22 du RGPD, vous pouvez demander une intervention humaine sur toute décision automatisée." },
    { q: "Puis-je modifier ma demande après envoi ?", a: "Vous pouvez contacter votre conseiller pour modifier certains éléments de votre demande tant qu'elle est en cours d'étude. Des modifications importantes (montant, durée, type de prêt) peuvent nécessiter une nouvelle instruction du dossier." },
  ],
  "Remboursement": [
    { q: "Puis-je rembourser par anticipation ?", a: "Oui, vous pouvez rembourser votre crédit partiellement ou totalement par anticipation à tout moment. Pour les remboursements supérieurs à 10 000 € sur 12 mois consécutifs, une indemnité de remboursement anticipé peut s'appliquer (art. L312-34 Code de la consommation), plafonnée à 1% du capital remboursé." },
    { q: "Y a-t-il des pénalités de remboursement anticipé ?", a: "Pour les crédits à la consommation : des indemnités peuvent s'appliquer si le remboursement anticipé dépasse 10 000 € sur 12 mois (max 1% du capital). Si la durée restante est inférieure à 1 an, ce plafond est de 0,5%. Ces règles sont définies par l'art. L312-34 du Code de la consommation." },
    { q: "Que se passe-t-il en cas de difficultés financières ?", a: "Contactez immédiatement votre conseiller. Des solutions existent : report d'échéances (selon contrat), modulation des mensualités, restructuration du prêt. En cas de surendettement : Banque de France, numéro 3414 (gratuit). N'attendez pas d'accumuler des retards." },
    { q: "Puis-je modifier la date de prélèvement ?", a: "Oui, sous réserve d'accord de l'établissement prêteur et selon les conditions contractuelles. La demande doit être effectuée au moins 15 jours avant la prochaine échéance, depuis votre espace client ou par courrier recommandé." },
    { q: "Puis-je faire une pause dans mes remboursements ?", a: "Certains contrats incluent une clause de modulation permettant une suspension temporaire des mensualités (généralement 1 à 3 mois, 1 fois par an). Cette possibilité figure dans les conditions particulières de votre contrat. Hors clause contractuelle, une demande de report peut être étudiée au cas par cas." },
    { q: "Comment obtenir mon tableau d'amortissement ?", a: "Votre tableau d'amortissement complet est disponible dans votre espace client, rubrique 'Mes documents'. Vous pouvez le télécharger au format PDF à tout moment. Vous pouvez également en demander un exemplaire papier à votre conseiller." },
  ],
  "Légal & Sécurité": [
    { q: "Quel est le délai légal de rétractation ?", a: "Conformément aux articles L312-19 et suivants du Code de la consommation, vous disposez d'un délai de 14 jours calendaires pour vous rétracter après acceptation de l'offre de crédit. Ce délai court à compter du lendemain de l'acceptation. Aucun motif n'est nécessaire, aucune pénalité n'est applicable." },
    { q: "Que faire si je veux exercer mon droit de rétractation ?", a: "Utilisez le formulaire de rétractation joint à votre offre de crédit, ou adressez une lettre recommandée avec accusé de réception à : FinancePro SAS — Service Rétractation — 1 rue de la Finance, 75001 Paris. Dans les 14 jours suivant la rétractation, remboursez le capital versé et les intérêts courus." },
    { q: "Comment exercer mon droit d'accès à mes données ?", a: "Vous pouvez demander l'accès, la rectification ou la suppression de vos données personnelles par email à dpo@financepro.fr ou par courrier à : FinancePro SAS — DPO — 1 rue de la Finance, 75001 Paris. Nous répondons dans un délai maximum de 30 jours conformément à l'article 15 du RGPD." },
    { q: "Êtes-vous couvert par le Fonds de Garantie des Dépôts ?", a: "Non. FinancePro est un intermédiaire, pas une banque. Nous ne recevons pas de dépôts. Le Fonds de Garantie des Dépôts (FGDR) couvre les dépôts auprès des établissements bancaires. En revanche, nos partenaires prêteurs sont agréés par l'ACPR et couverts par les mécanismes de protection applicables." },
    { q: "Comment déposer une réclamation ?", a: "Étape 1 : contactez notre service réclamations à reclamations@financepro.fr (réponse sous 10 jours ouvrables). Étape 2 : si insatisfait, saisissez notre médiateur agréé. Étape 3 : recours auprès de l'ACPR ou de la DGCCRF. Notre procédure complète est disponible sur la page Réclamations." },
  ],
};

const faqData_es = {
  "Generalidades": [
    { q: "¿Qué es FinancePro?", a: "FinancePro es un intermediario registrado, conectando particulares y profesionales con entidades de crédito asociadas aprobadas por las autoridades financieras para ofrecerle las mejores condiciones." },
    { q: "¿Sois una entidad de crédito autorizada?", a: "No. FinancePro no es una entidad prestamista. Somos un intermediario autorizado que le conecta con entidades de crédito aprobadas por los organismos pertinentes." },
    { q: "¿En qué plazo puedo obtener una respuesta?", a: "Recibirá una respuesta de principio en 24 horas hábiles tras la presentación de un expediente completo. En caso de estar incompleto, un asesor le contactará para solicitarle los documentos que faltan. El desembolso de los fondos se realiza en un plazo de 48 horas tras la firma." },
    { q: "¿Cuáles son vuestros horarios de atención?", a: "Nuestro equipo está disponible de lunes a viernes, de 9:00 a 18:00 horas, y los sábados de 9:00 a 12:00 horas. Fuera de este horario, nuestro asistente virtual responderá a sus dudas, o bien podrá dejarnos una consulta en nuestra plataforma." },
    { q: "¿Están seguros mis datos?", a: "Sí. Empleamos el cifrado TLS 1.3 para las comunicaciones y AES-256 para el almacenamiento de información. Sus datos se alojan en la Unión Europea y jamás son revendidos a terceros. Cumplimos rigurosamente con el RGPD. Consulte nuestra Política de Privacidad para obtener información detallada." },
    { q: "¿Puedo realizar una solicitud si figuro en un fichero de morosidad (como ASNEF/FICP)?", a: "Si consta en un registro de historial crediticio negativo, su acceso al crédito estará restringido por la normativa existente. Las entidades nos requieren consultar estos ficheros. Le recomendamos ponerse en contacto con un asesor para analizar detalladamente su situación particular." },
    { q: "¿Tengo que abonar gastos de formalización o apertura?", a: "La simulación y el posterior estudio de su expediente son totalmente gratuitos para usted. FinancePro se financia mediante comisiones satisfechas por las entidades prestatarias. Los posibles cargos que aplique la entidad financiera en última instancia aparecerán desglosados explícitamente en la oferta vinculante, previo a cualquier firma de su parte." },
    { q: "¿Cómo puedo contactar con un asesor?", a: "Para contactarnos, llame al +34 91 000 00 00 (cuota regular, lunes a viernes de 9 a 18 hrs), escríbanos a contact@financepro.es, use nuestro formulario de ayuda, el chat de nuestra web, o mediante el portal de cliente exclusivo del usuario. Plazo máximo de resolución garantizado: 24h hábiles." },
  ],
  "Simulación": [
    { q: "¿La simulación me compromete de algún modo?", a: "No, en absoluto. La simulación no reviste carácter contractual y es una herramienta meramente orientativa, de acceso gratuito e incondicionado. No constituye ningún género de obligación ni compromiso en modo alguno. Podrá tramitar el número de simulaciones que requiera ajustando libremente las variables contempladas en el cuestionario cuantas veces desee." },
    { q: "¿Cuál es el motivo de que el tipo consignado se presente como orientativo?", a: "Esa tipología estimativa depende sobre todo de los atributos de cálculo introducidos. El cargo exacto (el TAE definitivo) quedará configurado bajo evaluación del conjunto estructural de su formulario completado. Siguiendo preceptos legales ineludibles se pondrá explícitamente a su alcance mediante propuesta escrita de contrato antes de adquirir compromisos adicionales respecto al crédito solicitado." },
    { q: "¿Puedo realizar sucesivas simulaciones?", a: "Sí, sin duda. Podrá consumar reiteradas proyecciones todas cuantas juzgue necesarias a su libre conveniencia. Podrá hacer uso de tal herramienta prescindiendo completamente de requisitos previos tales como registro de identificación. Ni alterará ni perjudicara en aspecto alguno su valoración en cuanto solicitante potencial de cara a posibles acuerdos vinculantes con la entidad de destino de sus solicitudes de préstamo futuro o transacciones relativas al crédito personal demandadas." },
    { q: "¿Qué implica en detalle la denominación llamada TAE?", a: "Esa denominación alude y cifra de qué clase se componen tanto el esfuerzo temporal invertido como además su peso absoluto traducibles mediante su correspondiente equivalente tasado. En definitiva, es un instrumento de medida establecido para calcular cuál sea dicho impacto." },
    { q: "¿De qué forma y arreglo a qué criterios está compuesta  la elaboración analítica de lo referido por concepto llamado cuota en tanto unidad mensual estanca programada para cumplir puntualmente de su parte como solicitante potencial del acuerdo?", a: "Por supuesto, la respuesta no remite a arbitrariedad. Emplearemos parámetros establecidos por la normativa en uso compartida mediante procedimientos comunes universales." },
  ],
  "Solicitud de préstamo": [
    { q: "¿De qué documentos tengo que dotarme a propósito de tal solicitud en transcurso?", a: "Necesitará los documentos correspondientes en atención a su actual estatus y condiciones de vida habitual." },
    { q: "¿Puedo presentar una propuesta conjuntamente sumando rentas de mis convivientes y/o partes asociadas?", a: "Claro que puede, añadiendo así solidez combinada que se asuma por tanto mediante aportes integrados solidariamente." },
    { q: "¿Aparecerá expuesta la presente actividad al ser consultada su procedencia tras la finalización del hipotético encargo inicial en lo que pudieren revelarse indagaciones sobre las partes intervinientes por terceras partes con intereses legítimamente constituidos a partir de ahí?", a: "De ningún modo." },
    { q: "¿Cuál sería  mi proceder oportuno después de que me informen  acaso en la comunicación de resolución final acerca de la indisposición explícitamente pronunciada  de las partes evaluadoras contra los fines de la provisión solicitada  en susodicho instante?", a: "Puede optar a retomar tras pausa de  prórroga temporal o esperar cambio drástico respecto a condicionantes que lastraron." },
    { q: "¿Cómo hacer válida la interrupción e incluso la retractación retroactiva frente al  conjunto del actual expediente recién o aún a medias constituido que he sido invitado al efecto?", a: "Tiene absoluto imperio incondicional de desestimación en fechas tempranas de todo aquello." },
    { q: "¿Quién decide en qué va a derivar mi futuro compromiso? ¿Es una inteligencia mecánica automática carente de empatía quien está emitiendo los correspondientes veredictos o al contrario resultare esto ser todo en cambio labor de pericia a  cuenta  por cierto de personas competentes habilitadas  al punto  con juicio claro e independencia moral responsable predispuestos a otorgar con rectitud justa a quien lo pretendiese  al alcance de  la circunstancial eventualidad de los acontecimientos en juego?", a: "Serán los integrantes reales del elenco de especialistas los verdaderos responsables finales siempre detrás de cada pormenor, sin escrúpulo y al completo." },
    { q: "¿Se admite ulterior agregación y/o posible depuración modificatoria del material documental allegado  durante tramos precedentes de todo este asunto en curso o ya no podré remediar ninguna insuficiencia si resulta ser ésta en consecuencia mi voluntad expresada tiempo despues oportunamente en su preciso momento y antes de terminar todo esto?", a: "Tendrá opciones para hacerlo." },
  ],
  "Reembolso": [
    { q: "¿Puedo devolver por anticipado?", a: "Sí, puede pagarlo total o parcialmente, en conformidad a marcos preestablecidos y la regularización oportuna consiguiente de aquellos montos estipulados sin que signifique perjuicio desmesurado de penalización impuesta injustificable de parte nuestra en consecuencia directa respecto a ese hecho sobre ello en lo derivado." },
    { q: "¿Contenemos en vuestras propuestas algún modo claro para anticipar gastos asociados que recaerían llegado tal paso a título indicativo  y tal como se hubiere previamente preestablecido sobre dichos montos adelantados con la  pretensión final ineludible o inexcusable  que hubiese lugar cuando llegue el tiempo señalado según el actual documento a partir  acaso de tales eventualidades futuras de índole punitiva a tenor expresado?", a: "Para su conocimiento e interés lo puede revisar." },
    { q: "¿Cuál será mi postura a tomar en la eventualidad probable o incierta de una inminencia grave de liquidez o acaso estrechez de fortuna perjudicial imprevista y por ende una insolvencia que pueda dificultarme cumplir de manera ininterrumpida frente y puntualmente de la forma previamente prescrita contra las estipulaciones pactadas firmemente entre las partes consortes sin dilación y justificación creíble demostrada a fecha corriente y hora al caso pertinente y por completo con mi obligación sin reparo consiguiente?", a: "Si ocurren, lo hablaremos pacíficamente." },
    { q: "¿Me posibilitan Vds un traslado o postergación temporal a voluntad, referidas del momento puntual acordado cada  día concreto o fijado durante esos ciclos estacionales ordinariamente regulares donde se hace efectivo cobro consuetudinario previsto sin contratiempo ni excepción salvo acuerdo tácito a fecha pertinente?", a: "Sí, si usted previamente lo informa." },
    { q: "¿Conceden ustedes permisos adicionales  temporales a efectos de paralizar los correspondientes envíos programados consuetudinarios, siempre sujeto  ciertamente bajo los precisos motivos indicados sin dolo ni prefabricada negligencia a título indicativo u a priori?", a: "Es una alternativa a tratar mediante consulta y previa notificación justificada." },
    { q: "¿Por medio de quién lograría encontrar acceso directo sin rodeos  ni retrasos innecesariamente y sin requerir mayor papeleos de otra naturaleza a conseguir copias en resguardo  permanente de manera expedita hacia y la total visualización general comprensiva detallada a modo descriptivo del plan integral completo estipulado bajo firma al que yo libremente estoy apegado desde inicio de mis requerimientos ante Ustedes referenciado en estas partes ahora mismo vinculantes respecto de ello al mismo tiempo?", a: "En la plataforma en todo momento posible a su entero servicio y requerimiento." },
  ],
  "Legal y Seguridad": [
    { q: "¿Cuánto plazo  comprende su concesión inobjetable para hacerme dar atrás irrevocablemente y rechazar bajo mi sola determinación esto sin alegatos?", a: "14 días tras su consentimiento en este país europeo." },
    { q: "¿Qué debo formalizar en la  dada ocasión eventual que tuviere en lo porvenir e irremediablemente,  sobre el actual decurso mi decisión de no ir adelante en absoluto?", a: "Notificaciones estipuladas regulares que no implican gastos." },
    { q: "¿Qué vías existen provistas al propósito sin ser obstaculizado exprofesamente para hacer rectificar y corregir mis identidades dejadas  si fueren menester y estuvieren fuera sin yo requerir su total persistente alojamiento por imperativo ineludible en esto y frente  en tales archivos ahora o posteriormente en estos asuntos sin interrupción aparente del acceso a ello sin que hubiese en este acto mayor dificultad injustificada de parte de su entidad involucrada u otra cualquiera sin reservas con respecto  acerca a los derechos inherentes  recalcados en esto a la parte actuante respecto al derecho mencionado y  todo ello recogido sin excepción en todo esto para todos sobre estas obligaciones presentes en toda ocasión por todos lados a este efecto respecto a lo estipulado entre nuestras partes y los referidos derechos expresos?", a: "Escribiendo por los conductos dispuestos con esa finalidad preestablecidos en el sistema general." },
    { q: "¿Es esta la modalidad institucional resguardada expresamente a  título excepcional, garantizada con certidumbre y aval gubernativo en fondo sin  lugar al error general en esto bajo el patrocinio legal de esa conocida salvaguardia protectora dispuesta por los poderes públicos nacionales pertinentes en la eventualidad posible contra bancarrota fraudulenta por consiguiente al daño injustificado en base de lo afirmado y asegurado al depositario consiguiente sin reserva sin condiciones sobre el futuro previsible sin alteración que conste?", a: "Somos un mero agente articulante." },
    { q: "¿Dónde radico quejas  al momento indicado fundamentadas que expongan eventuales maltratos  si surgieran, faltas o defectos perjudiciales contrarios en la práctica  al transcurso o a propósito del presente trámite de conformidad al asunto que acaece y lo que yo me sienta o tuviere agraviado indebidamente bajo todos los medios?", a: "Tenemos conductos expresamente destinados para reclamaciones en su beneficio." },
  ],
};

export default function FAQPage() {
  const { dict, lang } = useDictionary();
  const locale = lang as AppLocale;
  const faqData = lang === 'fr' ? faqData_fr : faqData_es;

  // Initialize with the first available section depending on language
  const initialSection = lang === 'fr' ? 'Généralités' : 'Generalidades';
  const [openSection, setOpenSection] = useState<string | null>(initialSection);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const allQuestions = Object.entries(faqData).flatMap(([cat, items]) =>
    items.map((item) => ({ ...item, category: cat }))
  );

  const filteredQuestions = search.length > 2
    ? allQuestions.filter((item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "4rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.25rem" }}>
            {lang === 'fr' ? 'Questions Fréquentes' : 'Preguntas Frecuentes'}
          </h1>
          <div style={{ maxWidth: "500px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input
              type="search"
              placeholder={lang === 'fr' ? "Rechercher une question..." : "Buscar una pregunta..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: "2.75rem", borderRadius: "var(--radius-full)" }}
              aria-label="Rechercher dans la FAQ"
            />
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>

          {filteredQuestions ? (
            <div>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                {filteredQuestions.length} {lang === 'fr' ? (filteredQuestions.length !== 1 ? 'résultats' : 'résultat') : (filteredQuestions.length !== 1 ? 'resultados' : 'resultado')} {lang === 'fr' ? 'pour' : 'para'} &laquo; {search} &raquo;
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {filteredQuestions.map(({ q, a, category }) => (
                  <div key={q} className="accordion-item">
                    <button
                      className="accordion-trigger"
                      onClick={() => setOpenQuestion(openQuestion === q ? null : q)}
                      aria-expanded={openQuestion === q}
                    >
                      <div>
                        <span className="badge badge-primary" style={{ marginBottom: "0.25rem", fontSize: "0.7rem" }}>{category}</span>
                        <div>{q}</div>
                      </div>
                      <ChevronDown size={18} className="accordion-icon" aria-hidden="true" />
                    </button>
                    {openQuestion === q && <div className="accordion-body">{a}</div>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]" style={{gap: "2rem", alignItems: "start"}}>
              {/* Category nav */}
              <nav style={{ position: "sticky", top: "5rem" }} aria-label="Catégories FAQ">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {Object.keys(faqData).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setOpenSection(cat)}
                      aria-pressed={openSection === cat}
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-md)",
                        border: "none",
                        background: openSection === cat ? "var(--color-primary)" : "transparent",
                        color: openSection === cat ? "white" : "var(--color-text-muted)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        fontWeight: openSection === cat ? "700" : "400",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s",
                      }}
                    >
                      {cat}
                      <span style={{
                        float: "right",
                        background: openSection === cat ? "rgba(255,255,255,0.2)" : "var(--color-bg-alt)",
                        color: openSection === cat ? "white" : "var(--color-text-muted)",
                        borderRadius: "99px",
                        padding: "0.1rem 0.5rem",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                      }}>
                        {(faqData as any)[cat].length}
                      </span>
                    </button>
                  ))}
                </div>
              </nav>

              {/* Questions */}
              <div>
                {openSection && (
                  <div>
                    <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>{openSection}</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {((faqData as any)[openSection] || []).map(({ q, a }: { q: string, a: string }, i: number) => (
                        <div key={i} className="accordion-item">
                          <button
                            className="accordion-trigger"
                            onClick={() => setOpenQuestion(openQuestion === q ? null : q)}
                            aria-expanded={openQuestion === q}
                            id={`faq-${i}`}
                          >
                            {q}
                            <ChevronDown size={18} className="accordion-icon" aria-hidden="true" />
                          </button>
                          {openQuestion === q && (
                            <div className="accordion-body" role="region" aria-labelledby={`faq-${i}`}>
                              {a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Still have questions */}
          <div
            style={{
              marginTop: "3rem",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
              borderRadius: "var(--radius-xl)",
              padding: "2.5rem",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "0.75rem" }}>
              {lang === 'fr' ? "Vous n'avez pas trouvé votre réponse ?" : "¿No ha encontrado su respuesta?"}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>
              {lang === 'fr' ? "Nos conseillers répondent à toutes vos questions sous 24h ouvrées." : "Nuestros asesores responden a todas sus preguntas en 24h hábiles."}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={getLocalizedPath('contact', locale)} className="btn btn-white btn-sm">{lang === 'fr' ? 'Nous contacter' : 'Contáctenos'}</Link>
              <a href="tel:+34910000000" className="btn btn-sm" style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
                {lang === 'fr' ? '01 00 00 00 00' : '+34 91 000 00 00'}
              </a>
            </div>
          </div>

          {/* JSON-LD FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: allQuestions.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: { "@type": "Answer", text: a },
                })),
              }),
            }}
          />
        </div>
      </section>
    </>
  );
}
