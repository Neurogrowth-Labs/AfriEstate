import React from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description }) => {
  return (
    <article className="bg-white dark:bg-dark-surface p-7 rounded-2xl text-left shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary mb-3">Lifestyle collection</p>
      <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-3">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
    </article>
  );
};

export default CategoryCard;
