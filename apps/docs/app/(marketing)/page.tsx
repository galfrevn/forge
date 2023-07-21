import Link from 'next/link';

import { siteConfiguration } from 'configuration/site';

import { badgeVariants } from 'components/ui/badge';
import { buttonVariants } from 'components/ui/button';

const repositoryMetadata = async () => {
  const response = await fetch('https://api.github.com/repos/galfrevn/forge', {
    headers: { Accept: 'application/vnd.github+json' },
    next: { revalidate: 60 },
  });

  if (!response?.ok) return null;
  const json = await response.json();

  return parseInt(json['stargazers_count']).toLocaleString();
};

export default async function IndexPage() {
  const stars = await repositoryMetadata();

  return (
    <>
      <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
        <div className='container flex  flex-col items-start gap-4 text-start'>
          <Link
            href='/docs'
            className={badgeVariants({ variant: 'outline', className: 'px-4 py-1.5 rounded-xl' })}
          >
            🎉 Introducing Templates, a new CLI and more.
          </Link>

          <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>
            🔥 Igniting Creativity <br /> Mastering Code
          </h1>
          <p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-8'>
            Welcome to Forge, the ultimate open-source CLI journey where your coding dreams come
            alive with a single command. Empower your projects with the fusion of modern coding
            prowess and the artistry of seamless crafting.
          </p>
          <div className='space-x-4'>
            <Link className={buttonVariants({ size: 'lg' })} href='/docs'>
              Get Started
            </Link>
            <Link
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href={siteConfiguration.links.github}
              target='_blank'
              rel='noreferrer'
            >
              🧠 Contribute
            </Link>
          </div>
        </div>
      </section>

      <section id='open-source' className='container py-8 md:py-12 lg:py-24'>
        <div className='mx-auto flex flex-col items-start justify-center gap-4 text-start'>
          <h2 className='font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
            Join the Community
          </h2>
          <p className='max-w-[85%] lg:max-w-[50%] leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
            Connect with a thriving open-source community of developers, all passionate about
            innovating and sharing their coding experiences.
          </p>
          {stars && (
            <Link
              href={siteConfiguration.links.github}
              target='_blank'
              rel='noreferrer'
              className={badgeVariants({
                variant: 'outline',
                className: 'px-4 py-1.5 rounded-xl',
              })}
            >
              {stars} ⭐ on GitHub
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
