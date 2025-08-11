import { Comment } from '@/hooks/useExpandableComments';

export const sampleComments: Comment[] = [
  {
    id: '1',
    author: 'Carlos Mendoza',
    date: '2025-01-15',
    rating: 5,
    comment: 'Excelente análisis del mercado. La estrategia de diversificación propuesta es muy sólida y considero que puede generar retornos consistentes a largo plazo. Me gusta especialmente el enfoque en sectores defensivos durante períodos de volatilidad.'
  },
  {
    id: '2',
    author: 'Ana García',
    date: '2025-01-14',
    rating: 4,
    comment: 'Buena recomendación sobre las acciones tecnológicas. Sin embargo, creo que deberíamos considerar más el factor ESG en nuestras decisiones de inversión. El mercado está evolucionando hacia inversiones más sostenibles.'
  },
  {
    id: '3',
    author: 'Roberto Silva',
    date: '2025-01-13',
    rating: 5,
    comment: 'El análisis fundamental de la empresa es muy completo. Los ratios financieros muestran una posición sólida y el crecimiento orgánico es prometedor. Recomiendo mantener la posición actual y considerar aumentar la exposición gradualmente.'
  },
  {
    id: '4',
    author: 'María López',
    date: '2025-01-12',
    rating: 3,
    comment: 'Interesante perspectiva sobre el sector inmobiliario. Aunque los fundamentos son sólidos, me preocupa la sensibilidad a las tasas de interés. Sugiero un enfoque más conservador en este sector.'
  },
  {
    id: '5',
    author: 'Luis Torres',
    date: '2025-01-11',
    rating: 5,
    comment: 'Excelente timing para entrar al mercado de commodities. La combinación de factores geopolíticos y la recuperación económica global crean una oportunidad única. Recomiendo una asignación del 15-20% del portafolio.'
  }
];

export const getCommentsByCategory = (category: string): Comment[] => {
  // Aquí puedes filtrar comentarios por categoría
  // Por ahora retornamos todos los comentarios
  return sampleComments;
};

export const getCommentsByDate = (startDate: string, endDate: string): Comment[] => {
  return sampleComments.filter(comment => 
    comment.date >= startDate && comment.date <= endDate
  );
};
