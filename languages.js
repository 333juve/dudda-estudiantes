import { I18n } from "i18n-js";
const translations = {
  en: {
    welcome: "Welcome to",
    dudda: "Dudda!",
    titleFeature1: "Take the test to verify your account and start teaching.",
    descFeature1: "We have sent the link to your email.",
    titleFeature2: "Select your hours.",
    descFeature2: "You will find the option in the left menu.",
    titleFeature3: "Add a payment method.",
    descFeature3: "In the left menu, enter the Deposits option.",
    titleFeature4: "Start taking classes.",
    descFeature4:
      "Access the details from the app and we will contact you to confirm.",
    loading: "Loading...",
    home: "Home",
    profile: "Profile",
    schedule: "Schedule",
    deposit: "Payments",
    supporte: "Contact Us",
    shareSocial: "Share",
    signup: "Sign Up",
    login: "Log In",
    password: "Password",
    forgetPassword: "Forgot your password?",
    forrgetPassMess:
      "Please enter your email address and we will send you a link where you can reset your password.",
    logout: "Log Out",
    sendingCode: "Sending code...",
    sendCode: "Send code",
    emailRequired: "Email required",
    enterEmail: "Please enter your email.",
    emailSent: "Email sent",
    checkmailToresetPass: "Please check your email to reset your password.",
    errorSendingMail: "Error sending code",
    errorSendingMailMess:
      "There was an error sending the password reset code. Please verify the information you entered and try again.",
    confirmLogout: "Are you sure you want to log out?",
    cancel: "Cancel",
    back: "Back",
    signupMessage: "Sign up and start teaching with us!",
    notification: "Notifications",
    currentBalence: "Current balance",
    noNotification: "No notifications yet.",
    classSchedule: "Scheduled lessons",
    noClass: "No lessons scheduled yet.",
    notVerified:
      "Verify your account and start teaching. Submit your admissions exam.",
    takeExam: "Take exam",
    firstName: "First name",
    lastName: "Last name",
    dob: "Birthday",
    phone: "Phone number",
    repeatPassword: "Confirm password",
    incompleteInform: "Incomplete information",
    noEmailRPass: "Please enter your email and password.",
    incompleteInformMess:
      "Please, complete your information to be able to register.",
    validateAgeMess: "Minimum age: You must be 18 years or older to register",
    confirmPass: "Try again : Passwords do not match.",
    errorSignup: "Error registering",
    errorSignupMess:
      "An error occurred during registration. Please verify your details and try again.",
    email: "Email",
    personelInform: "PERSONAL INFORMATION",
    ok: "OK",
    privacy: "PRIVACY",
    location: "Location",
    deleteAcount: "Delete account",
    deleteAcountDesc:
      "Your information will be permanently deleted, it is not possible to reverse this action.",
    confirm: "Keep",
    sunday: "S",
    monday: "M",
    tuesday: "T",
    wednesday: "W",
    thursday: "T",
    friday: "F",
    saturday: "S",
    chooseYourSchedule: "Choose your schedule",
    chooseYourScheduleDetail:
      "Green hours indicate free time. We will only book lessons at those times. Choose wisely as cancellations may reduce future bookings. Our system favors tutors with fewer cancellations.",
    bankAccountNumberTab: "Bank account code",
    bankAccountNumber: "Account Num.",
    interbankAccountNumberTab: "Interbank account code (IAC)",
    interbankAccountNumber: "AIC",
    paymentHistory: "Payments history",
    noPayment: "No payments yet.",
    name: "Name *",
    paternalLastName: "Last name *",
    sex: "Sex *",
    male: "Male",
    female: "Female",
    termsAndConds: "Terms and Conditions",
    acceptTermsAndConds: "I have read and accept the terms and conditions.",
    continue: "Continue",
    titleTerm1: "1. Introduction",
    descTerm1:
      "Welcome to Dudda, the online platform that connects tutors with students and parents. By using our services, you agree to be bound by the following terms and conditions. If you do not agree to these terms and conditions, please do not use our services.",
    titleTerm2: "2. Use of services",
    titleTerm2_1: "2.1 Registration",
    descTerm2_1:
      "To use our services, you must create an account on our platform by providing accurate and complete personal information. You are responsible for maintaining the confidentiality of your account and password, as well as for all activities that occur under your account. In addition, to register in Dudda as a teacher it is necessary to have reached the age of majority.",
    titleTerm2_2: "2.2 Classes and payments",
    descTerm2_2:
      "Users can schedule a class online and pay a fixed price per hour of class taught through our partner payment platform. Teachers will receive the total accrued pay for the week on Friday.",
    titleTerm2_3: "2.3 Cancellations and refunds",
    descTerm2_3:
      "If you need to cancel a class, you can do so without penalty as long as it is 48 hours in advance. In case of canceling less than 48 hours in advance, a temporary suspension will be applied that will not allow you to schedule new classes or give classes for a certain time. If the user has many cancellations in a row or has an unjustified absence, it can be sanctioned with the deletion of the account and prohibition to create new ones with the same data.",
    titleTerm2_4: "2.4 Content",
    descTerm2_4:
      "All user-generated content on our platform, including teacher feedback and ratings, must adhere to our usage guidelines and not violate third-party intellectual property rights. We reserve the right to moderate and remove any content we deem inappropriate.",
    titleTerm2_5: "2.5 Security and privacy",
    descTerm2_5:
      "We are committed to protecting your personal and financial information by storing it in encrypted form in our Google Firebase database. We also take security measures to prevent any unauthorized access to your information.",
    titleTerm2_6: "2.6 Video classes",
    descTerm2_6:
      "All classes will be filmed and reviewed for quality control. The only platforms allowed for video classes will be Google Meet, Zoom, and Teams.",
    titleTerm2_7: "2.7 Classes and Exclusivity",
    descTerm2_7:
      "To schedule a class with a Dudda user, teachers must do so through the app. Any attempt to reschedule outside of the app will be considered a serious breach of the terms and conditions of use, and may result in termination of the user's account. It is important that users follow the reprogramming process set forth in the app to ensure a safe and successful experience on Dudda.",
    titleTerm3: "3. Responsibilities",
    titleTerm3_1: "3.1 Responsibilities of teachers",
    descTerm3_1:
      "Teachers are responsible for providing high-quality online classes to students. In addition, they must comply with all applicable regulations and requirements in their jurisdiction. Missing a class is a serious offense that will be punishable by permanent account suspension .",
    titleTerm3_2: "3.2 Student Responsibilities",
    descTerm3_2:
      "Students are responsible for paying the agreed price for the class and for attending the scheduled class online. They must also adhere to our platform usage guidelines.",
    titleTerm3_3: "3.3 Dudda's Responsibilities",
    descTerm3_3:
      "We are committed to providing a high-quality and secure platform for connecting individual tutors with students. However, we are not responsible for the quality of the content taught by the instructors or for student attendance in scheduled classes.",
    titleTerm4: "4. Contact",
    descTerm4:
      "Users can contact our customer service via a WhatsApp number provided on the platform. We also provide a detailed guide that covers most of the common issues.",
    titleTerm5: "5. Intellectual Property",
    descTerm5:
      "Users are responsible for ensuring that any content they post on our platform does not infringe the intellectual property rights of third parties. By posting content on our platform, you grant Dudda a non-exclusive, transferable, sublicensable, royalty-free, worldwide license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such content in any medium or form now known or hereafter developed.",
    titleTerm6: "6. Applicable Law",
    descTerm6:
      "These terms and conditions are governed by the laws of the Republic of Peru. Any dispute or claim related to our services will be resolved in a competent court of the Republic of Peru.",
    titleTerm7: "7. Account Termination",
    descTerm7:
      "Dudda reserves the right to terminate any user account that violates these terms and conditions. In the event of account termination, all user account information will be removed from our database except for general information that will allow us to identify if the same person tries to create another account.",
    titleTerm8: "8. Modifications",
    descTerm8:
      "We reserve the right to change these terms and conditions at any time. If we make material changes, we will notify you by email or by a prominent notice on our platform. By using our services, you agree to these terms and conditions in full. If you have If you have any questions or concerns about these terms and conditions, please contact our customer service.",
    reportUser: "Report user, Do you want to report this user?",
    report: "Report",
    cancelClass: "Cancel lesson",
    cancelClassConfirm: "Are you sure you want to cancel this lesson?",
    settings: "Settings",
    settingsDesc: "Please select one of the following options.",
    report_User: "Report user",
    cancelClass: "Cancel lesson",
    cancelClass_desc:
      "First cancellation free. Subsequent cancellations may lead to permanent suspension.",
    ruleOut: "Rule out",
    thankyou_for_report: "Thank you for your report!",
    thankyou_for_report_desc:
      "We'll review it below and get back to you shortly.",
    emailNotOpened: "The email could not be opened. Please try again later.",
    videoCall: "Video call",
    videoCallJoin:
      "You are about to join the video call. Do you want to continue?",
    reasonOFCancel: "Explain to us the reason for the cancellation.",
    writeHere: "Write here...",
    confirmation: "Confirmation",
    conFirm: "Confirm",
    confirmSaveSchedule: "Are you sure you want to save the schedules?",
    updatedSchedule: "Schedules have been successfully updated.",
    permissionDenied: "Permission denied",
    errorNotificationToken: "Error getting notification token!",
    loactionPermision: "Location permission denied",
    loactionPermisionDesc:
      "Please enable location for this app in your phone's settings",
    gotoSettings: "Go to Settings",
    disableLocation: "Disable location",
    disableLocationDesc: "Are you sure you want to turn location off?",
    deactivate: "Deactivate",
    turnOffNotification: "Turn off notifications",
    turnOffNotificationDesc: "Are you sure you want to turn off notifications?",
    deleteNotification: "Delete notification",
    deleteNotificationDesc:
      "Are you sure you want to remove this notification?",
    eleminate: "Eliminate",
    with: "With",
    of: "of",
    to: "to",
    needHelp: "Need help?",
    needHelpDesc:
      "Please send us a message or call us and our team will contact you.",
    writeTous: "Text us",
    callUs: "Call us",
    faildToLogin: "Failed to login",
    faildToLoginDesc:
      "Sorry, we couldn't find an account with that information. Please check your details and try again.",
    emailOrPasswordisWrong:
      "The email or password is incorrect. Please verify your credentials and try again.",
    errorMinimumAge: "Minimum age required",
    errorMinimumAgeDesc: "You must be at least 18 years old to register.",
    understood: "Understood",
    sex: "Sex",
    scheduleAClass: "schedule a class",
    scheduleClass: "schedule class",
    duration: "Duration",
    hour: "hour",
    min: "minutes",
    selectADate: "Select a date",
    start: "Start",
    end:"End",
    minimumTime:"The minimum time for a class is 1 hour.",
    maximumTime:"The maximum time for a class is 3 hours.",
    and:"and",
    noTutor:"No tutors found",
    noTutorDesc:"Please try a different time or contact support.",
    classHistory:"Class history",
    noClassHistory:"You haven't had any class yet.",
    scheduledClass:"Scheduled classes",
    noscheduledClass:"You don't have any classes scheduled yet."
  },
  es: {
    welcome: "Bienvenido a",
    dudda: "¡Dudda!",
    titleFeature1:
      "Realiza la prueba para verificar tu cuenta y comienza a enseñar.",
    descFeature1: "Hemos enviado el enlace a tu correo electrónico.",
    titleFeature2: "Selecciona tus horas.",
    descFeature2: "Encontrarás la opción en el menú izquierdo.",
    titleFeature3: "Agrega un método de pago.",
    descFeature3: "En el menú izquierdo, ingresa a la opción Depósitos.",
    titleFeature4: "Comienza a tomar clases.",
    descFeature4:
      "Accede a los detalles desde la aplicación y nos pondremos en contacto contigo para confirmar.",
    loading: "Cargando...",
    home: "Inicio",
    profile: "Perfil",
    schedule: "Horario",
    deposit: "Depósitos",
    supporte: "Contáctanos",
    shareSocial: "Compartir",
    signup: "Registrarse",
    login: "Iniciar sesión",
    password: "Contraseña",
    forgetPassword: "¿Olvidaste tu contraseña?",
    forrgetPassMess:
      "Por favor, ingresa tu dirección de correo electrónico y te enviaremos un enlace donde podrás restablecer tu contraseña.",
    logout: "Cerrar sesión",
    sendingCode: "Enviando código...",
    sendCode: "Enviar código",
    emailRequired: "Correo electrónico requerido",
    enterEmail: "Por favor, ingresa tu correo electrónico.",
    emailSent: "Correo electrónico enviado",
    checkmailToresetPass:
      "Por favor, revisa tu correo electrónico para restablecer tu contraseña.",
    errorSendingMail: "Error al enviar el código",
    errorSendingMailMess:
      "Ocurrió un error al enviar el código de restablecimiento de contraseña. Por favor, verifica la información que ingresaste e inténtalo de nuevo.",
    confirmLogout: "¿Estás seguro de que deseas cerrar sesión?",
    cancel: "Cancelar",
    back: "Atrás",
    signupMessage: "¡Regístrate y empieza a enseñar con nosotros!",
    notification: "Notificaciones",
    currentBalence: "Saldo actual",
    noNotification: "Aún no tienes ninguna notificación.",
    classSchedule: "Clases programadas",
    noClass: "Aún no tienes clases programadas.",
    notVerified:
      "Verifica tu cuenta para empezar a recibir clases. Realiza tu examen de admisión.",
    takeExam: "Dar exam",
    firstName: "Nombre",
    lastName: "Apellidos",
    sex: "Sexo *",
    male: "Hombre",
    female: "Mujer",
    dob: "Fecha de nacimiento",
    phone: "Teléfono celular",
    repeatPassword: "Repetir contraseña",
    incompleteInform: "Información incompleta",
    noEmailRPass: "Por favor, ingresa tu correo electrónico y contraseña.",
    incompleteInformMess:
      "Por favor, completa tu información para poder registrarte.",
    validateAgeMess: "Edad mínima: debes tener 18 años o más para registrarte",
    confirmPass: "Intenta de nuevo: las contraseñas no coinciden.",
    errorSignup: "Error al registrarse",
    errorSignupMess:
      "Ocurrió un error durante el registro. Por favor, verifica tus datos e inténtalo de nuevo.",
    email: "Correo electrónico",
    personelInform: "INFORMACIÓN PERSONAL",
    ok: "Aceptar",
    privacy: "PRIVACIDAD",
    location: "Ubicación",
    deleteAcount: "Eliminar cuenta",
    deleteAcountDesc:
      "Tu información se eliminará permanentemente, no es posible revertir esta acción.",
    confirm: "Aceptar",
    sunday: "D",
    monday: "L",
    tuesday: "M",
    wednesday: "X",
    thursday: "J",
    friday: "V",
    saturday: "S",
    chooseYourSchedule: "Elige tu horario",
    chooseYourScheduleDetail:
      "Las horas verdes indican tiempo libre y solo programaremos clases en esos horarios. Elige sabiamente, ya que las cancelaciones pueden reducir las futuras reservas. Nuestro sistema favorece a los tutores con menos cancelaciones.",
    bankAccountNumberTab: "Número de cuenta bancaria",
    bankAccountNumber: "Nº de cuenta",
    interbankAccountNumberTab: "Número de cuenta interbancaria (CCI)",
    interbankAccountNumber: "CCI",
    paymentHistory: "Historial de pagos",
    noPayment: "Aún no tienes ningún pago.",
    name: "Nombre *",
    paternalLastName: "Apellido *",
    termsAndConds: "Términos y condiciones",
    acceptTermsAndConds: "He leído y acepto los términos y condiciones.",
    continue: "Continuar",
    titleTerm1: "1. Introducción",
    descTerm1:
      "Bienvenido a Dudda, la plataforma en línea que conecta tutores con estudiantes y padres. Al utilizar nuestros servicios, aceptas quedar sujeto a los siguientes términos y condiciones. Si no estás de acuerdo con estos términos y condiciones, por favor no utilices nuestros servicios.",
    titleTerm2: "2. Uso de los servicios",
    titleTerm2_1: "2.1 Registro",
    descTerm2_1:
      "Para utilizar nuestros servicios, debes crear una cuenta en nuestra plataforma proporcionando información personal precisa y completa. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, así como de todas las actividades que ocurran bajo tu cuenta. Además, para registrarse en Dudda como profesor, es necesario haber alcanzado la mayoría de edad.",
    titleTerm2_2: "2.2 Clases y pagos",
    descTerm2_2:
      "Los usuarios pueden programar una clase en línea y pagar un precio fijo por hora de clase impartida a través de nuestra plataforma de pagos asociada. Los profesores recibirán el pago total acumulado de la semana los viernes.",
    titleTerm2_3: "2.3 Cancelaciones y reembolsos",
    descTerm2_3:
      "Si necesitas cancelar una clase, puedes hacerlo sin penalización siempre que sea con 48 horas de anticipación. En caso de cancelar con menos de 48 horas de anticipación, se aplicará una suspensión temporal que no te permitirá programar nuevas clases ni impartir clases durante cierto tiempo. Si el usuario tiene muchas cancelaciones seguidas o tiene una ausencia injustificada, puede ser sancionado con la eliminación de la cuenta y la prohibición de crear nuevas cuentas con los mismos datos.",
    titleTerm2_4: "2.4 Contenido",
    descTerm2_4:
      "Todo el contenido generado por los usuarios en nuestra plataforma, incluidos los comentarios y las calificaciones de los profesores, debe cumplir con nuestras pautas de uso y no violar los derechos de propiedad intelectual de terceros. Nos reservamos el derecho de moderar y eliminar cualquier contenido que consideremos inapropiado.",
    titleTerm2_5: "2.5 Seguridad y privacidad",
    descTerm2_5:
      "Nos comprometemos a proteger su información personal y financiera almacenándola en forma encriptada en nuestra base de datos de Google Firebase. También tomamos medidas de seguridad para evitar cualquier acceso no autorizado a su información.",
    titleTerm2_6: "2.6 Clases de video",
    descTerm2_6:
      "Todas las clases se grabarán y se revisarán para control de calidad. Las únicas plataformas permitidas para las clases de video serán Google Meet, Zoom y Teams.",
    titleTerm2_7: "2.7 Clases y exclusividad",
    descTerm2_7:
      "Para programar una clase con un usuario de Dudda, los profesores deben hacerlo a través de la aplicación. Cualquier intento de reprogramación fuera de la aplicación se considerará una violación grave de los términos y condiciones de uso, y puede resultar en la terminación de la cuenta del usuario. Es importante que los usuarios sigan el proceso de reprogramación establecido en la aplicación para garantizar una experiencia segura y exitosa en Dudda.",
    titleTerm3: "3. Responsabilidades",
    titleTerm3_1: "3.1 Responsabilidades de los profesores",
    descTerm3_1:
      "Los profesores son responsables de proporcionar clases en línea de alta calidad a los estudiantes. Además, deben cumplir con todas las regulaciones y requisitos aplicables en su jurisdicción. Faltar a una clase es una falta grave que será castigada con la suspensión permanente de la cuenta.",
    titleTerm3_2: "3.2 Responsabilidades de los estudiantes",
    descTerm3_2:
      "Los estudiantes son responsables de pagar el precio acordado por la clase y de asistir a la clase programada en línea. También deben adherirse a nuestras pautas de uso de la plataforma.",
    titleTerm3_3: "3.3 Responsabilidades de Dudda",
    descTerm3_3:
      "Nos comprometemos a proporcionar una plataforma segura y de alta calidad para conectar tutores individuales con estudiantes. Sin embargo, no somos responsables de la calidad del contenido impartido por los instructores ni de la asistencia de los estudiantes en las clases programadas.",
    titleTerm4: "4. Contacto",
    descTerm4:
      "Los usuarios pueden ponerse en contacto con nuestro servicio de atención al cliente a través de un número de WhatsApp proporcionado en la plataforma. También proporcionamos una guía detallada que cubre la mayoría de los problemas comunes.",
    titleTerm5: "5. Propiedad intelectual",
    descTerm5:
      "Los usuarios son responsables de asegurarse de que cualquier contenido que publiquen en nuestra plataforma no infrinja los derechos de propiedad intelectual de terceros. Al publicar contenido en nuestra plataforma, otorgas a Dudda una licencia no exclusiva, transferible, sublicenciable, sin regalías y mundial para usar, copiar, reproducir, procesar, adaptar, modificar, publicar, transmitir, mostrar y distribuir dicho contenido en cualquier medio o forma conocida o desarrollada en el futuro.",
    titleTerm6: "6. Ley aplicable",
    descTerm6:
      "Estos términos y condiciones están regidos por las leyes de la República del Perú. Cualquier disputa o reclamo relacionado con nuestros servicios se resolverá en un tribunal competente de la República del Perú.",
    titleTerm7: "7. Terminación de la cuenta",
    descTerm7:
      "Dudda se reserva el derecho de terminar cualquier cuenta de usuario que viole estos términos y condiciones. En caso de terminación de la cuenta, se eliminará toda la información de la cuenta del usuario de nuestra base de datos, excepto la información general que nos permitirá identificar si la misma persona intenta crear otra cuenta.",
    titleTerm8: "8. Modificaciones",
    descTerm8:
      "Nos reservamos el derecho de cambiar estos términos y condiciones en cualquier momento. Si realizamos cambios sustanciales, te notificaremos por correo electrónico o mediante un aviso destacado en nuestra plataforma. Al utilizar nuestros servicios, aceptas estos términos y condiciones en su totalidad. Si tienes alguna pregunta o inquietud acerca de estos términos y condiciones, por favor contacta a nuestro servicio de atención al cliente.",
    reportUser: "Reportar usuario, ¿Deseas reportar a este usuario?",
    report: "Reportar",
    cancelClass: "Cancelar clase",
    cancelClassConfirm: "¿Estás seguro de que quieres cancelar esta clase?",
    settings: "Configuración",
    settingsDesc: "Por favor, selecciona una de las siguientes opciones.",
    report_User: "Reportar usuario",
    cancelClass: "Cancelar clase",
    cancelClass_desc:
      "La primera cancelación es gratuita. Las cancelaciones posteriores pueden llevar a la suspensión permanente.",
    ruleOut: "Descartar",
    thankyou_for_report: "¡Gracias por tu reporte!",
    thankyou_for_report_desc:
      "Lo revisaremos a continuación y te responderemos en breve.",
    emailNotOpened:
      "No se pudo abrir el correo electrónico. Por favor, inténtalo de nuevo más tarde.",
    videoCall: "Llamada de video",
    videoCallJoin:
      "Estás a punto de unirte a la llamada de video. ¿Deseas continuar?",
    reasonOFCancel: "Explícanos el motivo de la cancelación.",
    writeHere: "Escribe aquí...",
    confirmation: "Confirmación",
    conFirm: "Confirmar",
    confirmSaveSchedule: "¿Estás seguro de que quieres guardar los horarios?",
    updatedSchedule: "Los horarios se han actualizado correctamente.",
    permissionDenied: "Permiso denegado",
    errorNotificationToken: "¡Error al obtener el token de notificación!",
    loactionPermision: "Permiso de ubicación denegado",
    loactionPermisionDesc:
      "Por favor, habilita la ubicación para esta aplicación en la configuración de tu teléfono",
    gotoSettings: "Ir a Configuración",
    disableLocation: "Desactivar ubicación",
    disableLocationDesc:
      "¿Estás seguro de que quieres desactivar la ubicación?",
    deactivate: "Desactivar",
    turnOffNotification: "Desactivar notificaciones",
    turnOffNotificationDesc:
      "¿Estás seguro de que quieres desactivar las notificaciones?",
    deleteNotification: "Eliminar notificación",
    deleteNotificationDesc:
      "¿Estás seguro de que quieres eliminar esta notificación?",
    eleminate: "Eliminar",
    with: "Con",
    of: "de",
    to: "a",
    needHelp: "¿Necesitas ayuda?",
    needHelpDesc:
      "Por favor, envíanos un mensaje o llámanos y nuestro equipo se pondrá en contacto contigo.",
    writeTous: "Escríbenos",
    callUs: "Llámanos",
    faildToLogin: "Error al iniciar sesión",
    faildToLoginDesc:
      "Lo sentimos, no pudimos encontrar una cuenta con esa información. Por favor, verifica tus datos e inténtalo de nuevo.",
    emailOrPasswordisWrong:
      "El correo electrónico o la contraseña son incorrectos. Por favor, verifica tus credenciales e inténtalo de nuevo.",
    errorMinimumAge: "Edad mínima requerida",
    errorMinimumAgeDesc: "Debes tener al menos 18 años para registrarte.",
    understood: "Entendido",
    duration: "Duración",
    hour: "hora",
    min: "minutos",
    selectADate: "Selecciona una fecha",
    start: "Inicio",
  },
};
export const i18n = new I18n(translations);
//scheduleAClass:"Agenda una clase"
// scheduleClass:"Agendar clase"
//end:"Fin"
//minimumTime:"El tiempo mínimo para una clase es de 1 hora."
//maximumTime:"El tiempo máximo para una clase es de 3 horas."
//and:"y"
//noTutor:"No se encontraron tutores"
//noTutorDesc:"Por favor, intente un horario diferente o contacte al soporte."
// classHistory:"Historial de clases"
// noClass:" Aún no has tenido ninguna clase."
//scheduledClasses:"Clases programadas"
// noscheduledClass: " Aún no tienes ninguna clase programada."