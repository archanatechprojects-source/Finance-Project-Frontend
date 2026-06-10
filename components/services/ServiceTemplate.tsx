import Image from "next/image";

interface ServiceTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
}

export default function ServiceTemplate({
  title,
  subtitle,
  description,
  benefits,
}: ServiceTemplateProps) {
  return (
    <main>

      {/* Banner */}
      <section className="pt-32 pb-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-6xl font-bold">
            {title}
          </h1>

          <p className="mt-6 text-xl text-slate-300">
            {subtitle}
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <h2 className="text-4xl font-bold">
                What is {title}?
              </h2>

              <p className="mt-8 text-lg text-slate-600 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="relative h-100 rounded-3xl overflow-hidden">
              <Image
                src="/images/service-banner.jpg"
                alt={title}
                fill
                className="object-cover"
              />
            </div>

          </div>

        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-center text-5xl font-bold">
            Benefits
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            {benefits.map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl p-8 shadow"
              >
                <h3 className="font-semibold">
                  {item}
                </h3>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-24 text-center">

        <h2 className="text-5xl font-bold">
          Need Expert Guidance?
        </h2>

        <button className="mt-8 px-8 py-4 bg-blue-700 text-white rounded-xl">
          Contact Advisor
        </button>

      </section>

    </main>
  );
} 