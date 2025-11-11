/**
 * Testes para componente Button
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('deve renderizar com children', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  it('deve chamar onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    
    fireEvent.click(screen.getByText('Clique'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando disabled=true', () => {
    render(<Button disabled>Desabilitado</Button>);
    const button = screen.getByText('Desabilitado');
    expect(button).toBeDisabled();
  });

  it('deve mostrar loading quando isLoading=true', () => {
    render(<Button isLoading>Enviar</Button>);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('deve aplicar variante primary por padrão', () => {
    render(<Button>Botão</Button>);
    const button = screen.getByText('Botão');
    expect(button).toHaveClass('bg-primary-600');
  });

  it('deve aplicar variante danger', () => {
    render(<Button variant="danger">Excluir</Button>);
    const button = screen.getByText('Excluir');
    expect(button).toHaveClass('bg-red-600');
  });

  it('deve aplicar tamanho lg', () => {
    render(<Button size="lg">Grande</Button>);
    const button = screen.getByText('Grande');
    expect(button).toHaveClass('px-6', 'py-3');
  });

  it('não deve chamar onClick quando disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Bloqueado</Button>);
    
    fireEvent.click(screen.getByText('Bloqueado'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('não deve chamar onClick quando isLoading', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} isLoading>Carregando</Button>);
    
    fireEvent.click(screen.getByText('Carregando...'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});



