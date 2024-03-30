import { expect, test } from 'vitest';
import {
  validateName,
  validateEmail,
  validatePassword,
  formatQuizCount,
  currentYear
} from '../utils/utils';

test('validateName is validating correct names', () => {
  expect(validateName('User')).toBe(true);
  expect(validateName('user123')).toBe(false);
});

test('validateEmail is validating correct emails', () => {
  expect(validateEmail('user@gmail.com')).toBe(true);
  expect(validateEmail('12345')).toBe(false);
  expect(validateEmail('invalid-email')).toBe(false);
});

test('validatePassword is validating correct passwords', () => {
  expect(validatePassword('Password1234')).toBe(true);
  expect(validatePassword('123')).toBe(false);
});

test('formatQuizCount is the number of answered quiz displayed on user account', () => {
  expect(formatQuizCount(0)).toBe('Aucun quiz réalisé');
  expect(formatQuizCount(1)).toBe('1 quiz réalisé');
  expect(formatQuizCount(5)).toBe('quiz réalisés');
});

test('currentYear is displaying actual year', () => {
  expect(currentYear).toBe(new Date().getFullYear());
});
