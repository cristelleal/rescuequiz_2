export function validateName(name: string): boolean {
  const nameReg = /^[a-zA-Z]{3,16}$/;
  return nameReg.test(name);
}

export function validateEmail(email: string): boolean {
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailReg.test(email);
}

export function validatePassword(password: string): boolean {
  const passwordReg = /^[a-zA-Z0-9@-]{6,20}$/;
  return passwordReg.test(password);
}

export function formatQuizCount(quizCount: number): string {
  if (quizCount === 0) {
    return 'Aucun quiz réalisé';
  } else if (quizCount === 1) {
    return 'quiz réalisé';
  } else {
    return `quiz réalisés`;
  }
}

const date: Date = new Date();
export const currentYear: number = date.getFullYear();
