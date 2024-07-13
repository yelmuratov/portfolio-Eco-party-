'use client';

import { SVGProps, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { z } from 'zod';
import { fetchProjects, getCategories } from '@/services/api';
import { useTheme } from 'next-themes';

// Define TypeScript types
type Project = {
  id: number;
  name: string;
  category: string;
  image: string;
  link: string;
  demo_video: string;
};

type Category = {
  id: string;
  name: string;
};

// Define the Zod schema
const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  image: z.string().url(),
  link: z.string().url(),
  demo_video: z.string().url(),
});

export default function Component() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        const category_data = await getCategories();
        setCategories(category_data);
        setProjects(data);
        setLoading(false);
      } catch (error) {
        setError('Error while getting projects');
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;

  if (!mounted) {
    return null;
  }

  const Api_url = 'https://ecoapi.araltech.tech/';

  return (
    <div className={`flex flex-col min-h-screen ${theme}`}>
      <header className="bg-background container md:mt-12 mt-4 dark:bg-background-dark px-4 lg:px-4 h-20 flex items-center justify-between">
        <Link href="#" className="flex items-center" prefetch={false}>
          <Image src={'/logo.svg'} width={50} height={50} alt={''} />
          <span className="sr-only">Portfolio</span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">PORTFOLIO</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-muted-foreground dark:text-muted-foreground-dark"
        >
          {theme === 'dark' ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </Button>
      </header>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex pl-24 items-center justify-center gap-4 mb-8 overflow-x-auto no-scrollbar">
          <Button
            variant={selectedCategory === null ? 'default' : 'ghost'}
            className="text-muted-foreground dark:text-muted-foreground-dark font-medium"
            onClick={() => handleCategoryClick(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'ghost'}
              className="text-muted-foreground dark:text-muted-foreground-dark font-medium"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : loading ? (
            [...Array(8)].map((_, index) => (
              <Card className="group" key={index}>
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : filteredProjects.length === 0 ? (
            <div className="text-center col-span-full text-muted-foreground dark:text-muted-foreground-dark">
              No projects found
            </div>
          ) : (
            filteredProjects.map((project) => {
              const category = categories.find(
                (cat) => cat.id === project.category
              );
              return (
                <Link href={`/projects/${project.id}`} key={project.id}>
                  <Card className="group">
                    <img
                      src={Api_url + project.image}
                      alt={project.name}
                      width={400}
                      height={300}
                      className="rounded-t-lg object-cover w-full aspect-[4/3] group-hover:opacity-80 transition-opacity"
                    />
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-primary dark:text-primary-dark">
                          {project.name}
                        </h3>
                        <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark">
                          {category?.name ?? 'Unknown'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}
