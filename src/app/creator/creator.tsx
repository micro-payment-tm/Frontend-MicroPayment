"use client";

import styles from "./creator.module.css";

type MenuItem = {
  label: string;
  active: boolean;
  icon: string;
};

type CourseCardItem = {
  title: string;
  level: string;
  students: number;
  duration: string;
  image: string;
};

type TipItem = {
  user: string;
  time: string;
  amount: string;
  accent: "violet" | "pink" | "cyan";
};

const menu: MenuItem[] = [
  { label: "Overview", active: true, icon: "▦" },
  { label: "My Curriculum", active: false, icon: "📖" },
  { label: "Earnings", active: false, icon: "💳" },
  { label: "Students", active: false, icon: "👥" },
  { label: "Rewards", active: false, icon: "🏆" },
];

const courses: CourseCardItem[] = [
  {
    title: "Quantum Entanglement 101",
    level: "INTERMEDIATE",
    students: 320,
    duration: "12h content",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Particle Physics",
    level: "BEGINNER",
    students: 500,
    duration: "8h content",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Relativity Explained",
    level: "ADVANCED",
    students: 210,
    duration: "15h content",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  },
];

const tips: TipItem[] = [
  {
    user: "User_921",
    time: "2 minutes ago",
    amount: "0.05 ETH",
    accent: "violet",
  },
  {
    user: "Alice_Web3",
    time: "1 hour ago",
    amount: "120 MUSDD",
    accent: "pink",
  },
  {
    user: "Block_Mage",
    time: "4 hours ago",
    amount: "0.02 ETH",
    accent: "cyan",
  },
];

const chartBars: number[] = [38, 52, 26, 60, 39, 82, 64];

export default function Page(): JSX.Element {
  return (
    <div className={styles.page}>
      <div className={styles.pageGlow} />

      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <div className={styles.brand}>MILEA</div>
          <nav className={styles.nav}>
            <a href="#">Dashboard</a>
            <a href="#">Courses</a>
            <a href="#">Analytics</a>
            <a href="#">Community</a>
          </nav>
        </div>

        <div className={styles.topbarRight}>
          <button className={styles.iconButton}>🔔</button>
          <button className={styles.iconButton}>⚙️</button>
          <button className={styles.walletButton}>Connect Wallet</button>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarProfile}>
            <div className={styles.sidebarAvatarWrap}>
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
                alt="Creator"
                className={styles.sidebarAvatar}
              />
            </div>
            <div>
              <div className={styles.sidebarTitle}>Creator Hub</div>
              <div className={styles.sidebarSubtitle}>Verified Instructor</div>
            </div>
          </div>

          <button className={styles.createButton}>Create New Course</button>

          <div className={styles.menuList}>
            {menu.map((item) => (
              <button
                key={item.label}
                className={`${styles.menuItem} ${item.active ? styles.menuItemActive : ""}`}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.sidebarSupport}>
            <span className={styles.supportIcon}>?</span>
            <span>Support</span>
          </div>
        </aside>

        <main className={styles.main}>
          <section className={styles.heroCard}>
            <div className={styles.heroMedia}>
              <div className={styles.heroAvatarFrame}>
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
                  alt="Professor"
                  className={styles.heroAvatar}
                />
              </div>
              <div className={styles.verifiedBadge}>VERIFIED</div>
            </div>

            <div className={styles.heroContent}>
              <div className={styles.heroTopRow}>
                <div>
                  <h1 className={styles.heroName}>Prof. Haliim P.</h1>
                  <div className={styles.walletMiniRow}>
                    <span className={styles.walletMiniIcon}>◧</span>
                    <span className={styles.walletMiniValue}>0x892...32c1</span>
                  </div>
                </div>
                <div className={styles.heroHandle}>(@s_jenkins)</div>
              </div>

              <p className={styles.heroDescription}>
                Quantum Physics researcher at CERN. Passionate about decentralizing
                education and micro-payments for science.
              </p>

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Students</div>
                  <div className={styles.statValue}>1.2k</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Courses</div>
                  <div className={styles.statValue}>8</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Earned</div>
                  <div className={`${styles.statValue} ${styles.statValueAccent}`}>4.5 ETH</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Rating</div>
                  <div className={styles.statValue}>4.9 ★</div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.contentArea}>
            <div className={styles.coursesColumn}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Created Courses</h2>
                <button className={styles.viewAllButton}>View All</button>
              </div>

              <div className={styles.courseGrid}>
                {courses.slice(0, 2).map((course) => (
                  <CourseCard key={course.title} course={course} />
                ))}

                <CourseCard course={courses[2]} />

                <div className={styles.newCourseCard}>
                  <div className={styles.newCoursePlus}>+</div>
                  <div className={styles.newCourseTitle}>Draft New Course</div>
                  <div className={styles.newCourseSubtitle}>Start a new scientific journey</div>
                </div>
              </div>
            </div>

            <div className={styles.rightRail}>
              <div className={styles.sidePanel}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelHeaderIcon}>▣</span>
                  <h3>Teaching Stats</h3>
                </div>

                <div className={styles.panelCaption}>Student Growth (MTD)</div>

                <div className={styles.chartWrap}>
                  {chartBars.map((value, index) => (
                    <div key={index} className={styles.chartBarOuter}>
                      <div
                        className={`${styles.chartBar} ${index >= 5 ? styles.chartBarAccent : ""}`}
                        style={{ height: `${value}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className={styles.chartLabels}>
                  <span>Week 01</span>
                  <span>Current</span>
                </div>

                <div className={styles.topPerformingCard}>
                  <div className={styles.topPerformingLabel}>Top Performing</div>
                  <div className={styles.topPerformingTitle}>Particle Physics</div>
                  <div className={styles.topPerformingSub}>94% Completion Rate</div>
                </div>
              </div>

              <div className={styles.sidePanel}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelHeaderIcon}>⌁</span>
                  <h3>Recent Tips</h3>
                </div>

                <div className={styles.tipList}>
                  {tips.map((tip) => (
                    <div key={tip.user} className={styles.tipItem}>
                      <div className={styles.tipLeft}>
                        <div className={`${styles.tipAvatarRing} ${styles[`tipAccent${tip.accent}`]}`}>
                          <div className={styles.tipAvatar}>👤</div>
                        </div>
                        <div>
                          <div className={styles.tipUser}>{tip.user}</div>
                          <div className={styles.tipTime}>{tip.time}</div>
                        </div>
                      </div>
                      <div className={styles.tipAmount}>{tip.amount}</div>
                    </div>
                  ))}
                </div>

                <button className={styles.withdrawButton}>Withdraw Funds</button>
                <p className={styles.withdrawHint}>Gas fees will be automatically calculated.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: CourseCardItem }): JSX.Element {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseImageWrap}>
        <img src={course.image} alt={course.title} className={styles.courseImage} />
        <div className={styles.courseOverlay} />
        <span className={styles.courseLevel}>{course.level}</span>
      </div>

      <div className={styles.courseBody}>
        <h3 className={styles.courseTitle}>{course.title}</h3>

        <div className={styles.courseMeta}>
          <div>⇢ {course.students} students</div>
          <div>◔ {course.duration}</div>
        </div>

        <div className={styles.courseActions}>
          <button className={styles.manageButton}>Manage Course</button>
          <button className={styles.shareButton}>⤴</button>
        </div>
      </div>
    </div>
  );
}
