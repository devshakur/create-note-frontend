interface LayoutProps {
  children: React.ReactNode
  imageSrc?: string
  imageAlt?: string
}

const RegistrationLayout = ({
  children,
  imageSrc,
  imageAlt = 'TakeNote',
}: LayoutProps) => {
  return (
    <div className="grid min-h-svh w-full min-w-0 grid-cols-1 lg:grid-cols-2">
      <section className="relative hidden min-h-svh overflow-hidden bg-[#f3efe6] lg:block">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            width={1100}
            height={880}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top-left"
          />
        ) : (
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#ffd67a_0%,transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(180,255,59,0.45)_0%,transparent_50%),linear-gradient(160deg,#1a1814_0%,#2c261c_45%,#3d3428_100%)]"
            aria-hidden
          />
        )}
      </section>

      <section className="flex min-h-svh min-w-0 flex-col items-center justify-center overflow-visible bg-white px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md perspective-[1400px]">{children}</div>
      </section>
    </div>
  )
}

export default RegistrationLayout
