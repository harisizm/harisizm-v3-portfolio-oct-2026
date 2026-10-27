import Image from 'next/image';

interface TechIconProps {
  component?: React.ElementType;
  iconUrl?: string;
}

export const TechIcon = ({ component, iconUrl }: TechIconProps) => {
  return (
    <>
      {component ? (
        (() => {
          const Component = component;
          return <Component className="size-10" />;
        })()
      ) : (
        <Image
          src={iconUrl || ''}
          alt="tech icon"
          width={40}
          height={40}
          className="size-10 object-contain"
        />
      )}
    </>
  );
};