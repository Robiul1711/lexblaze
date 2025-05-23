import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TearmAndConditionModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-sm sm:text-lg md:text-xl font-bold hover:text-primary">
        Términos y Condiciones
      </DialogTrigger>
      <DialogContent className="border-[5px] border-primary max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4 font-bold text-center">
            Términos y Condiciones
          </DialogTitle>
          <div className="overflow-y-auto max-h-[65vh] pr-4">
            <div className="space-y-6 text-black">
              {/* 1. Applicability & Jurisdiction */}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  1. Applicability & Jurisdiction / Aplicabilidad y Jurisdicción
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">English:</span>
                  <br />
                  This Service is provided by Hoy Familia, a company incorporated in Texas, United States. By accessing or using the Service, you agree to be bound by these Terms. All legal matters shall be governed by the laws of Texas, United States, without regard to conflict of law principles. Colombian users expressly waive any rights under Colombian law that may conflict with these Terms.
                </p>
                <p>
                  <span className="font-semibold">Español:</span>
                  <br />
                  Este Servicio es proporcionado por Hoy Familai, una empresa constituida en Texas, Estados Unidos. Al acceder o utilizar el Servicio, usted acepta estar obligado por estos Términos. Todos los asuntos legales se regirán por las leyes de Texas, Estados Unidos, sin considerar principios de conflicto de leyes. Los usuarios colombianos renuncian expresamente a cualquier derecho bajo la ley colombiana que pueda conflictuar con estos Términos.
                </p>
              </div>

              {/* 2. Service Description */}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  2. Service Description / Descripción del Servicio
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">English:</span>
                  <br />
                  We provide a platform for businesses to create profiles and manage events, which are displayed to users through a calendar-based feed. We reserve the right to modify or discontinue the Service at any time without notice.
                </p>
                <p>
                  <span className="font-semibold">Español:</span>
                  <br />
                  Proporcionamos una plataforma para que las empresas creen perfiles y gestionen eventos, los cuales se muestran a los usuarios a través de un feed basado en calendario. Nos reservamos el derecho de modificar o discontinuar el Servicio en cualquier momento sin previo aviso.
                </p>
              </div>

              {/* 3. Account Registration */}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  3. Account Registration / Registro de Cuenta
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">English:</span>
                  <br />
                  - You must provide accurate and complete information
                  <br />
                  - You are responsible for maintaining account security
                  <br />
                  - We may suspend or terminate accounts at our discretion
                </p>
                <p>
                  <span className="font-semibold">Español:</span>
                  <br />
                  - Debe proporcionar información precisa y completa
                  <br />
                  - Es responsable de mantener la seguridad de su cuenta
                  <br />
                  - Podemos suspender o terminar cuentas a nuestra discreción
                </p>
              </div>

              {/* 4. Content Ownership */}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  4. Content Ownership / Propiedad del Contenido
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">English:</span>
                  <br />
                  All content you submit becomes our exclusive property. You grant us a perpetual, worldwide license to use, modify, and commercialize your content.
                </p>
                <p>
                  <span className="font-semibold">Español:</span>
                  <br />
                  Todo el contenido que envíe se convierte en nuestra propiedad exclusiva. Nos otorga una licencia perpetua y mundial para usar, modificar y comercializar su contenido.
                </p>
              </div>

              {/* 5. User Obligations */}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  5. User Obligations / Obligaciones del Usuario
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">English:</span>
                  <br />
                  You agree not to:
                  <br />
                  - Post illegal or harmful content
                  <br />
                  - Violate intellectual property rights
                  <br />
                  - Use the Service for unauthorized commercial purposes
                </p>
                <p>
                  <span className="font-semibold">Español:</span>
                  <br />
                  Usted acepta no:
                  <br />
                  - Publicar contenido ilegal o dañino
                  <br />
                  - Violar derechos de propiedad intelectual
                  <br />
                  - Usar el Servicio para fines comerciales no autorizados
                </p>
              </div>

              {/* 6. Termination */}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  6. Termination / Terminación
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">English:</span>
                  <br />
                  We may terminate your access immediately for violations of these Terms, without liability.
                </p>
                <p>
                  <span className="font-semibold">Español:</span>
                  <br />
                  Podemos terminar su acceso inmediatamente por violaciones de estos Términos, sin responsabilidad alguna.
                </p>
              </div>

              {/* 7. Disclaimers */}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  7. Disclaimers / Descargos
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">English:</span>
                  <br />
                  The Service is provided "as is" without warranties. We are not liable for indirect or incidental damages.
                </p>
                <p>
                  <span className="font-semibold">Español:</span>
                  <br />
                  El Servicio se proporciona "tal cual" sin garantías. No somos responsables por daños indirectos o incidentales.
                </p>
              </div>

              {/* 8. International Arbitration */}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  8. International Arbitration / Arbitraje Internacional
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">English:</span>
                  <br />
                  All disputes shall be resolved through binding arbitration in Austin, Texas under AAA rules. You waive rights to class action or trial by jury.
                </p>
                <p>
                  <span className="font-semibold">Español:</span>
                  <br />
                  Todas las disputas se resolverán mediante arbitraje vinculante en Austin, Texas bajo las reglas de AAA. Renuncia a acciones colectivas o juicio por jurado.
                </p>
              </div>

              {/* 9. Data Protection */}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  9. Data Protection / Protección de Datos
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">English:</span>
                  <br />
                  By using the Service, Colombian users consent to data transfer and processing in the United States as detailed in our Privacy Policy.
                </p>
                <p>
                  <span className="font-semibold">Español:</span>
                  <br />
                  Al usar el Servicio, los usuarios colombianos consienten la transferencia y procesamiento de datos en Estados Unidos según detalla nuestra Política de Privacidad.
                </p>
              </div>

              {/* 10. General Provisions */}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  10. General Provisions / Disposiciones Generales
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">English:</span>
                  <br />
                  - English version controls any translations
                  <br />
                  - These Terms constitute the entire agreement
                  <br />
                  - Failure to enforce any provision is not a waiver
                </p>
                <p>
                  <span className="font-semibold">Español:</span>
                  <br />
                  - La versión en inglés prevalece sobre traducciones
                  <br />
                  - Estos Términos constituyen el acuerdo completo
                  <br />
                  - La no aplicación de alguna disposición no es renuncia
                </p>
              </div>

              {/* Acceptance */}
              <div className="pt-4">
                <h3 className="font-bold text-lg mb-2">
                  Acceptance / Aceptación
                </h3>
                <p className="mb-2">
                  <span className="font-semibold">English:</span>
                  <br />
                  "I have read and agree to these Terms and Conditions"
                </p>
                <p>
                  <span className="font-semibold">Español:</span>
                  <br />
                  "He leído y acepto estos Términos y Condiciones"
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TearmAndConditionModal;