/**
 * Testes para funções utilitárias
 */

import { formatCurrency, formatDate, formatPhone, cn } from '@/lib/utils';

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('deve formatar valor monetário', () => {
      expect(formatCurrency(1000)).toBe('R$ 1.000,00');
      expect(formatCurrency(1500.50)).toBe('R$ 1.500,50');
      expect(formatCurrency(0)).toBe('R$ 0,00');
    });
  });

  describe('formatDate', () => {
    it('deve formatar data', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('15');
      expect(formatted).toContain('01');
      expect(formatted).toContain('2024');
    });

    it('deve aceitar string de data', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toContain('15');
    });
  });

  describe('formatPhone', () => {
    it('deve formatar telefone brasileiro', () => {
      expect(formatPhone('11987654321')).toBe('(11) 98765-4321');
    });

    it('deve retornar original se formato inválido', () => {
      expect(formatPhone('123')).toBe('123');
    });

    it('deve remover caracteres não numéricos', () => {
      expect(formatPhone('(11) 98765-4321')).toBe('(11) 98765-4321');
    });
  });

  describe('cn', () => {
    it('deve combinar classes', () => {
      const result = cn('class1', 'class2');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
    });

    it('deve lidar com classes condicionais', () => {
      const result = cn('base', true && 'conditional', false && 'ignored');
      expect(result).toContain('base');
      expect(result).toContain('conditional');
      expect(result).not.toContain('ignored');
    });

    it('deve remover classes duplicadas', () => {
      const result = cn('flex', 'flex');
      expect(result).toBe('flex');
    });
  });
});


