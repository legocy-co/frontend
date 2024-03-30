import { ComponentProps, FC, useEffect, useRef, useState } from 'react';

interface LazySvgProps extends ComponentProps<'svg'> {
  name: string;
}

// This hook can be used to create your own wrapper component.
const useLazySvgImport = (name: string) => {
  const importRef = useRef<FC<ComponentProps<'svg'>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        importRef.current = (
          await import(`../../assets/icons/${name}.svg?react`)
        ).default; // We use `?react` here following `vite-plugin-svgr`'s convention.
      } catch (err) {
        console.log(err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);

  return {
    error,
    loading,
    Svg: importRef.current,
  };
};

// Example wrapper component using the hook.
export const LazySvg = ({ name, ...props }: LazySvgProps) => {
  const { loading, error, Svg } = useLazySvgImport(name);

  if (error) {
    return 'An error occurred';
  }

  if (loading) {
    return 'Loading...';
  }

  if (!Svg) {
    return null;
  }

  return <Svg {...props} />;
};
