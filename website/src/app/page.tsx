export const dynamic = "force-dynamic";

import { getSkills, getCategories, getLanguages } from "@/lib/skills";
import { getTotalSkillsCount, getCategoryCounts } from "@/lib/store";
import { AgentsMarquee } from "@/components/AgentsMarquee";
import { InstallCommandBlock } from "@/components/InstallCommandBlock";
import { SkillsList } from "@/components/SkillsList";
import { SectionLabel } from "@/components/SectionLabel";
import { HeroTitle } from "@/components/HeroTitle";
import { HeroCtaRow } from "@/components/HeroCtaRow";

export default async function HomePage() {
  const [skills, catalogCategories, languages, totalSkills, categoryCounts] = await Promise.all([
    getSkills(),
    getCategories(),
    getLanguages(),
    getTotalSkillsCount().catch(() => 0),
    getCategoryCounts().catch(() => ({} as Record<string, number>)),
  ]);

  // Derive categories from DB counts (all 92k) merged with static catalog
  const allCategoriesSet = new Set<string>([...catalogCategories, ...Object.keys(categoryCounts)]);
  const categories = Array.from(allCategoriesSet).sort();

  return (
    <div className="min-w-0 w-full space-y-16 md:space-y-20 lg:space-y-24">
      {/* Hero – one rounded card; fixed navbar is in Header (top-2, max-w-7xl, px-6 py-4) */}
      <section className="hero-fold animate-on-scroll pb-4 md:pb-6">
        <div className="hero-fold-container relative min-h-[45rem] overflow-hidden rounded-t-none rounded-b-[2rem] border border-border border-t-0">
          <div className="hero-fold-bg absolute inset-0 z-0" aria-hidden />
          <div className="relative z-10 px-6 pt-20 pb-12 md:pt-24 md:pb-16">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
              <HeroTitle>
                <h1 className="hero-title-billingsdk font-[family-name:var(--font-display)] font-normal text-white tracking-tight leading-[0.95] text-foreground">
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">Agent Skills</span>
                  <span className="hero-accent block text-3xl mt-1 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white/80">for All</span>
                </h1>
                <p className="hero-accent-warm mt-5 text-sm font-medium uppercase tracking-widest text-white/70">
                  by TestMu AI
                </p>
              </HeroTitle>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-balance text-white/80 sm:text-lg">
              A growing library of skills for AI agents. 
              Install any skill with a single command to extend your agent capabilities across domains — testing, automation, data, web, and more.
              </p>
              <div className="mt-8">
                <HeroCtaRow />
              </div>
              <div id="hero-install" className="hero-code-card mt-10 w-full max-w-2xl scroll-mt-24">
                <InstallCommandBlock variant="hero" />
              </div>
              <div className="mt-12 w-full max-w-4xl">
                <AgentsMarquee />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills – list layout */}
      <section id="skills" className="animate-on-scroll scroll-mt-24">
        <SectionLabel label="Skills" />
        <div className="mt-4">
          <SkillsList
            skills={skills}
            categories={categories}
            languages={languages}
            totalSkills={totalSkills}
            categoryCounts={categoryCounts}
          />
        </div>
      </section>
    </div>
  );
}
