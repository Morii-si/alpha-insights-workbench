'use client';

export const dynamic = 'force-static';

import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Check,
  ChevronDown,
  CirclePlus,
  Clock3,
  FileText,
  Flame,
  Folder,
  LayoutGrid,
  ListFilter,
  MessageSquareText,
  Play,
  Search,
  Settings2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { Switch } from '@/components/ui/switch';

type View =
  | 'brief'
  | 'research'
  | 'tracking'
  | 'calendar'
  | 'skills'
  | 'ledger';
const stages: { n: string; title: string; owner: string; view: View }[] = [
  { n: '01', title: 'Idea 产生', owner: '人提出方向', view: 'brief' },
  { n: '02', title: '信息筛选', owner: 'AI 扩大视野', view: 'brief' },
  { n: '03', title: '深度研究', owner: 'AI 组织证据', view: 'research' },
  { n: '04', title: '形成决策', owner: '人承担判断', view: 'research' },
  { n: '05', title: '持续跟踪', owner: 'AI 降低遗漏', view: 'tracking' },
  { n: '06', title: '认知迭代', owner: '人更新框架', view: 'ledger' },
];
const nav: {
  id: View;
  label: string;
  meta: string;
  icon: typeof BookOpenText;
}[] = [
  { id: 'brief', label: '今日简报', meta: '12 条', icon: BookOpenText },
  {
    id: 'research',
    label: 'PaiWork 深研',
    meta: '3 份',
    icon: MessageSquareText,
  },
  { id: 'tracking', label: '跟踪看板', meta: '8 家', icon: TrendingUp },
  { id: 'calendar', label: '研究日历', meta: '7 场', icon: CalendarDays },
  { id: 'skills', label: 'Skills', meta: '16 个', icon: LayoutGrid },
  { id: 'ledger', label: '认知账本', meta: '5 条', icon: FileText },
];
const headlines = [
  ['01', '液冷产业链进入订单验证期', '公司披露', '数据中心', '过去 2 小时'],
  [
    '02',
    '和黄医药与 GSK 扩大 KRAS 新药合作',
    '公司公告',
    '创新药',
    '今天 09:16',
  ],
  ['03', '美国或调整半导体设备出口规则', '政策跟踪', '半导体', '今天 08:40'],
  ['04', 'Gemini 强化 Agent 与复杂编程能力', '产品发布', 'AI', '昨天 22:05'],
  ['05', '金刚石散热材料成为 AI 芯片新变量', '机构观点', '材料', '昨天 18:30'],
];
const watchlist: [string, string, string, boolean][] = [
  ['中恒电气', '002364.SZ', '+5.28%', true],
  ['恩捷股份', '002812.SZ', '+0.52%', true],
  ['爱科赛博', '688719.SH', '+3.48%', true],
  ['阳光电源', '300274.SZ', '+0.79%', true],
  ['华明装备', '002270.SZ', '-0.05%', false],
  ['宁德时代', '300750.SZ', '+0.35%', true],
  ['四方股份', '601126.SH', '+3.51%', true],
  ['麦格米特', '002851.SZ', '+7.25%', true],
];
const skills: [string, string, string, boolean, string][] = [
  ['公司一页纸', '把公告、业绩与估值压缩为一页决策材料', '官方', true, '18.6k'],
  [
    '业绩 / 公告 / 事件点评',
    '用统一框架识别变化、影响与待验证项',
    '官方',
    true,
    '9.9k',
  ],
  ['行业一页纸', '快速建立行业结构、关键变量与跟踪清单', '官方', true, '7.1k'],
  ['主题选股', '按主题、事件或新闻筛选 A 股标的', '官方', true, '6.9k'],
  ['公司调研大纲', '根据研究缺口生成有判断力的问题清单', '官方', false, '6.8k'],
  [
    '10 年国债择时信号',
    '基于期限结构与宏观变量形成观察信号',
    '机构专属',
    false,
    '25k',
  ],
];

function Wordmark() {
  return (
    <div className="wordmark" aria-label="Alpha 派">
      <span className="wordmark-mark">A</span>
      <span>
        <b>Alpha</b>
        <small>投研工作台</small>
      </span>
    </div>
  );
}
function Workflow({
  current,
  onPick,
}: {
  current: View;
  onPick: (v: View) => void;
}) {
  return (
    <div className="workflow" aria-label="投研工作流">
      {stages.map((stage, index) => (
        <button
          key={stage.n}
          className={stage.view === current ? 'stage active' : 'stage'}
          onClick={() => onPick(stage.view)}
        >
          <span className="stage-number">{stage.n}</span>
          <span>
            <b>{stage.title}</b>
            <small>{stage.owner}</small>
          </span>
          {index < stages.length - 1 && (
            <ArrowRight className="stage-arrow" size={14} />
          )}
        </button>
      ))}
    </div>
  );
}
function BriefView({ onResearch }: { onResearch: () => void }) {
  const [edition, setEdition] = useState<'cn' | 'global'>('cn');
  return (
    <section className="view" aria-labelledby="brief-title">
      <div className="view-heading">
        <div>
          <p className="kicker">01—02 · DISCOVERY</p>
          <h1 id="brief-title">今天，什么值得继续研究？</h1>
        </div>
        <div className="heading-note">
          <span>07:30 自动生成</span>
          <b>信息不是结论，只是研究入口。</b>
        </div>
      </div>
      <div className="edition-switch" role="tablist" aria-label="简报版本">
        <button
          className={edition === 'cn' ? 'active' : ''}
          onClick={() => setEdition('cn')}
        >
          国内版 · 9 月 4 日
        </button>
        <button
          className={edition === 'global' ? 'active' : ''}
          onClick={() => setEdition('global')}
        >
          全球版 · 9 月 4 日
        </button>
        <span>由「晨间扫描」定时任务整理</span>
      </div>
      <div className="brief-grid">
        <div className="news-list">
          <div className="module-title">
            <span>机构热议</span>
            <span className="module-meta">按研究价值排序</span>
          </div>
          {headlines.map((item, index) => (
            <article className="news-row" key={item[0]}>
              <span className="rank">{item[0]}</span>
              <div>
                <h2>
                  {edition === 'global' && index === 0
                    ? '海外算力基础设施资本开支继续上修'
                    : item[1]}
                </h2>
                <p>
                  {index === 0
                    ? '多家机构把判断从“需求预期”推进到“订单验证”，分歧集中在交付节奏与盈利兑现。'
                    : '来自公告、会议纪要与机构观点的交叉摘要，原文证据可在深研页继续展开。'}
                </p>
                <div className="tags">
                  <span>{item[2]}</span>
                  <span>{item[3]}</span>
                  <small>{item[4]}</small>
                </div>
              </div>
              <button className="text-action" onClick={onResearch}>
                进入深研 <ArrowRight size={14} />
              </button>
            </article>
          ))}
        </div>
        <aside className="brief-side">
          <div className="module-title">
            <span>组合热度</span>
            <span className="live-dot">LIVE</span>
          </div>
          {watchlist.slice(0, 6).map((stock, i) => (
            <div className="quote" key={stock[0]}>
              <b>{i + 1}</b>
              <span>
                {stock[0]}
                <small>{stock[1]}</small>
              </span>
              <strong className={stock[3] ? 'up' : 'down'}>{stock[2]}</strong>
            </div>
          ))}
          <div className="side-rule" />
          <div className="module-title compact">
            <span>下一场会议</span>
            <Clock3 size={15} />
          </div>
          <p className="next-event">09:30 · 科士达 2026 年半年度业绩交流会</p>
          <button className="outline-button">查看今日 7 场活动</button>
        </aside>
      </div>
    </section>
  );
}
function ResearchView() {
  const [source, setSource] = useState('HVDC 梳理');
  const [running, setRunning] = useState(false);
  const run = () => {
    setRunning(true);
    window.setTimeout(() => setRunning(false), 900);
  };
  return (
    <section className="view research-view" aria-labelledby="research-title">
      <div className="view-heading compact-heading">
        <div>
          <p className="kicker">03—04 · RESEARCH</p>
          <h1 id="research-title">把“搜到资料”推进到“形成判断”</h1>
        </div>
        <button className="primary-button" onClick={run}>
          <Play size={14} fill="currentColor" />
          {running ? '正在梳理证据…' : '重新运行研究'}
        </button>
      </div>
      <div className="research-shell">
        <aside className="project-tree">
          <div className="module-title">
            <span>电力设备个股资料</span>
            <Settings2 size={15} />
          </div>
          {[
            '良信股份  +2.83%',
            '思源电气  +1.65%',
            '纪要',
            '专家交流',
            '公司交流',
            '研报',
            '公告',
            '其他',
          ].map((name, i) => (
            <button
              key={name}
              className={i === 2 ? 'tree-item selected' : 'tree-item'}
            >
              {i < 2 ? (
                <TrendingUp size={14} />
              ) : i === 2 ? (
                <Folder size={14} />
              ) : (
                <FileText size={14} />
              )}
              <span>{name}</span>
            </button>
          ))}
        </aside>
        <div className="answer-pane">
          <div className="query-bubble">
            2026—2030 年芯片功率口径的市场装机量如何测算？
          </div>
          <div className="ai-label">
            <Sparkles size={15} />
            <b>PaiPai</b>
            <span>
              {running ? '正在检索 18 份材料' : '已完成回答 · 18 个来源'}
            </span>
          </div>
          <h2>核心结论</h2>
          <p>
            按“芯片功率口径”测算，市场在 2026—2030
            年进入持续扩容期。单一口径容易造成误判，因此需要同时保留芯片耗电、服务器新增与数据中心总装机三组边界。
          </p>
          <div className="claim">
            <span>判断 01</span>
            <b>
              需求上行的方向较一致，斜率仍取决于 GPU / ASIC 出货与供电架构演进。
            </b>
          </div>
          <ul className="evidence-list">
            <li>
              <button onClick={() => setSource('Jefferies')}>
                Jefferies · 2026-06
              </button>
              <span>自下而上测算加速器出货，对应 2028 年约 105.5GW。</span>
            </li>
            <li>
              <button onClick={() => setSource('美银美林')}>
                美银美林 · 2026-05
              </button>
              <span>以 GPU + ASIC 出货及单卡功耗估算新增功率。</span>
            </li>
            <li>
              <button onClick={() => setSource('摩根士丹利')}>
                摩根士丹利 · 2026-08
              </button>
              <span>按云厂商与自研芯片拆解 2027 年功耗结构。</span>
            </li>
          </ul>
          <div className="composer">
            <span className="source-chip">
              <FileText size={13} />
              {source}
            </span>
            <input aria-label="继续追问" placeholder="追问证据、口径或反例…" />
            <button aria-label="发送">
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
        <article className="source-pane">
          <div className="source-toolbar">
            <span>
              <FileText size={14} />
              {source}.md
            </span>
            <button>存入工作区</button>
          </div>
          <p className="source-type">SOURCE NOTE · 私人材料</p>
          <h2>HVDC 柜外电源侧：主要玩家、供应链归属与订单份额梳理</h2>
          <blockquote>
            柜外电源是 AI 数据中心从传统 UPS 向高压直流架构演进的关键环节。
          </blockquote>
          <h3>一、核心结论</h3>
          <ul>
            <li>国内格局集中度较高，但海外链条仍处在验证期。</li>
            <li>供应关系需拆分为技术认证、样机、小批量和稳定订单四个层级。</li>
            <li>市场份额数字应同时标注统计口径与时间范围。</li>
          </ul>
          <div className="source-proof">
            <span>引用位置</span>
            <b>第 12 页 · 段落 4</b>
            <p>机构：示例研究机构　日期：2026-08-28</p>
          </div>
        </article>
      </div>
    </section>
  );
}
function TrackingView({ goCalendar }: { goCalendar: () => void }) {
  const [period, setPeriod] = useState('1Y');
  return (
    <section className="view" aria-labelledby="tracking-title">
      <div className="view-heading compact-heading">
        <div>
          <p className="kicker">05 · MONITOR</p>
          <h1 id="tracking-title">
            中恒电气 <span className="ticker">002364.SZ</span>
          </h1>
        </div>
        <div className="price">
          <b>37.90</b>
          <span>+5.28%</span>
          <small>已加入跟踪</small>
        </div>
      </div>
      <div className="tracking-grid">
        <aside className="watchlist">
          <label>
            <Search size={15} />
            <input aria-label="搜索股票" placeholder="搜索股票 / 代码" />
          </label>
          {watchlist.map((s, i) => (
            <button
              key={s[0]}
              className={i === 0 ? 'watch-row selected' : 'watch-row'}
            >
              <span>
                <b>{s[0]}</b>
                <small>{s[1]}</small>
              </span>
              <strong className={s[3] ? 'up' : 'down'}>{s[2]}</strong>
            </button>
          ))}
        </aside>
        <div className="chart-module">
          <div className="chart-toolbar">
            <div>
              {['1M', '3M', '1Y', '3Y'].map((p) => (
                <button
                  className={period === p ? 'active' : ''}
                  onClick={() => setPeriod(p)}
                  key={p}
                >
                  {p}
                </button>
              ))}
            </div>
            <span>
              事件叠加 <b>ON</b>
            </span>
          </div>
          <svg
            className="chart"
            viewBox="0 0 720 280"
            role="img"
            aria-label="中恒电气股价及研究事件示意图"
          >
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e3120b" stopOpacity=".16" />
                <stop offset="1" stopColor="#e3120b" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[45, 95, 145, 195, 245].map((y) => (
              <line
                key={y}
                x1="25"
                x2="700"
                y1={y}
                y2={y}
                stroke="#d8d5ce"
                strokeWidth="1"
              />
            ))}
            <path
              d="M25 222 C70 205 88 232 126 195 S188 180 225 163 S278 196 316 155 S370 130 402 78 S452 42 486 69 S548 32 573 105 S628 123 700 94 L700 260 L25 260Z"
              fill="url(#fill)"
            />
            <path
              d="M25 222 C70 205 88 232 126 195 S188 180 225 163 S278 196 316 155 S370 130 402 78 S452 42 486 69 S548 32 573 105 S628 123 700 94"
              fill="none"
              stroke="#e3120b"
              strokeWidth="3"
            />
            {(
              [
                [126, 195, 'A'],
                [316, 155, '纪'],
                [402, 78, '调'],
                [573, 105, '报'],
                [660, 108, '点'],
              ] as [number, number, string][]
            ).map(([x, y, t]) => (
              <g key={x}>
                <circle cx={x} cy={y} r="12" fill="#fffefc" stroke="#e3120b" />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#b90f09"
                >
                  {t}
                </text>
              </g>
            ))}
          </svg>
          <div className="chart-axis">
            <span>2025-09</span>
            <span>2026-01</span>
            <span>2026-05</span>
            <span>2026-09</span>
          </div>
        </div>
        <aside className="event-panel">
          <div className="module-title">
            <span>研究事件</span>
            <span className="module-meta">未来 14 天 · 2 场</span>
          </div>
          <article>
            <span className="event-type">点评</span>
            <small>今天</small>
            <b>Q2 毛利率阶段性承压，数据中心业务收入高增</b>
            <p>判断影响：验证需求，但盈利兑现仍需观察。</p>
          </article>
          <article>
            <span className="event-type blue">路演</span>
            <small>明天 09:30</small>
            <b>2026 年半年度业绩交流会</b>
            <p>待确认：800VDC 在手订单与交付节奏。</p>
          </article>
          <button className="outline-button" onClick={goCalendar}>
            打开研究日历
          </button>
        </aside>
      </div>
    </section>
  );
}
function CalendarView() {
  const [mine, setMine] = useState(true);
  return (
    <section className="view" aria-labelledby="calendar-title">
      <div className="view-heading compact-heading">
        <div>
          <p className="kicker">05 · CALENDAR</p>
          <h1 id="calendar-title">研究日历</h1>
        </div>
        <label className="switch-label">
          <Switch
            checked={mine}
            onCheckedChange={setMine}
            className={mine ? 'switch on' : 'switch'}
          />
          仅看自选
        </label>
      </div>
      <div className="calendar-tabs">
        <button className="active">我的日历</button>
        <button>A 股业绩日历</button>
        <button>港股业绩日历</button>
        <button>美股业绩日历</button>
      </div>
      <div className="timeline">
        <aside>
          <b>9 月 4 日</b>
          <span>周五 · 7 场活动</span>
          {['路演 7', '调研 0', '策略会 0', '行业论坛 0'].map((x) => (
            <button key={x}>{x}</button>
          ))}
        </aside>
        <div className="hours">
          {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30'].map(
            (h, i) => (
              <div className="hour" key={h}>
                <span>{h}</span>
                {[0, 2, 4].includes(i) && (
                  <article>
                    <small>
                      {h} ·{' '}
                      {i === 0 ? '兴业证券' : i === 2 ? '长江证券' : '方正电新'}
                    </small>
                    <b>
                      {i === 0
                        ? '新城控股：合理估值水平在哪里'
                        : i === 2
                          ? '科士达半年度业绩交流会'
                          : '威腾电气中报业绩交流会'}
                    </b>
                    <span>已订阅 · 关联 3 份材料</span>
                  </article>
                )}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
function SkillsView() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(skills.map((s) => [s[0], s[3]])),
  );
  const [filter, setFilter] = useState('全部');
  return (
    <section className="view" aria-labelledby="skills-title">
      <div className="view-heading compact-heading">
        <div>
          <p className="kicker">WORKFLOW · SKILLS</p>
          <h1 id="skills-title">把常用研究方法封装进工作流</h1>
        </div>
        <button className="primary-button">
          <CirclePlus size={15} />
          导入 Skill
        </button>
      </div>
      <div className="skill-feature">
        <p>机构专属</p>
        <h2>已启用的研究技能</h2>
        <div>
          {skills
            .slice(0, 4)
            .filter((s) => enabled[s[0]])
            .map((s) => (
              <span key={s[0]}>
                <Check size={13} />
                {s[0]}
              </span>
            ))}
        </div>
      </div>
      <div className="filter-row">
        <ListFilter size={16} />
        {['全部', '公司研究', '行业研究', '事件跟踪'].map((x) => (
          <button
            key={x}
            onClick={() => setFilter(x)}
            className={filter === x ? 'active' : ''}
          >
            {x}
          </button>
        ))}
        <span>
          按使用频率排序 <ChevronDown size={14} />
        </span>
      </div>
      <div className="skills-grid">
        {skills.map((s, i) => (
          <article className="skill-card" key={s[0]}>
            <div className="skill-card-top">
              <span className="skill-icon">{i < 5 ? 'A' : '研'}</span>
              <label>
                <Switch
                  checked={enabled[s[0]]}
                  onCheckedChange={(checked) =>
                    setEnabled((v) => ({ ...v, [s[0]]: checked }))
                  }
                  className={enabled[s[0]] ? 'switch on' : 'switch'}
                />
              </label>
            </div>
            <h2>{s[0]}</h2>
            <p>{s[1]}</p>
            <footer>
              <span>{s[2]}</span>
              <span>
                <Flame size={13} />
                {s[4]}
              </span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
function LedgerView() {
  const [checked, setChecked] = useState([true, true, false]);
  const rows = [
    [
      '算力基础设施',
      '原判断：需求增长主要由训练侧驱动',
      '新证据：推理负载与供电改造成为增量来源',
    ],
    [
      'HVDC 电源',
      '原判断：海外链条验证慢于国内',
      '新证据：两家客户进入小批量订单阶段',
    ],
    [
      '液冷材料',
      '原判断：材料升级首先体现在散热效率',
      '待验证：可靠性与良率是否构成更高壁垒',
    ],
  ];
  return (
    <section className="view" aria-labelledby="ledger-title">
      <div className="view-heading">
        <div>
          <p className="kicker">06 · JUDGEMENT</p>
          <h1 id="ledger-title">最后一公里，必须由人完成</h1>
        </div>
        <div className="heading-note">
          <span>AI 的边界</span>
          <b>组织信息、暴露分歧；不替代仓位与责任。</b>
        </div>
      </div>
      <p className="ledger-lead">
        当新证据出现，系统不直接覆盖旧结论，而是把“原判断—新证据—决策变化”并排保留，迫使研究者明确自己为什么改变。
      </p>
      <div className="ledger-table">
        <div className="ledger-head">
          <span>主题</span>
          <span>此前判断</span>
          <span>本次变化</span>
          <span>已复核</span>
        </div>
        {rows.map((r, i) => (
          <div className="ledger-row" key={r[0]}>
            {r.map((x) => (
              <span key={x}>{x}</span>
            ))}
            <button
              aria-label={`复核 ${r[0]}`}
              onClick={() =>
                setChecked((v) => v.map((x, j) => (j === i ? !x : x)))
              }
              className={checked[i] ? 'check checked' : 'check'}
            >
              {checked[i] && <Check size={15} />}
            </button>
          </div>
        ))}
      </div>
      <div className="human-note">
        <span>DECISION NOTE</span>
        <h2>我的当前判断</h2>
        <p>
          需求方向成立，但兑现速度分化。下一步不是继续堆资料，而是验证订单质量、交付节奏与盈利能力三个变量。
        </p>
        <button className="primary-button">记录一次判断更新</button>
      </div>
    </section>
  );
}
function Workbench({ onReport }: { onReport: () => void }) {
  const [view, setView] = useState<View>('brief');
  const title = useMemo(
    () => nav.find((n) => n.id === view)?.label ?? '',
    [view],
  );
  useEffect(() => {
    type ModelContext = {
      registerTool: (
        tool: {
          name: string;
          title: string;
          description: string;
          inputSchema: object;
          annotations: object;
          execute: (input: unknown) => unknown;
        },
        options: { signal: AbortSignal },
      ) => void | Promise<void>;
    };
    const context = (document as Document & { modelContext?: ModelContext })
      .modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(
      context.registerTool(
        {
          name: 'navigate_research_workspace',
          title: '打开投研工作区',
          description: '在 Alpha 派 demo 中打开指定的真实工作区视图。',
          inputSchema: {
            type: 'object',
            properties: {
              section: { type: 'string', enum: nav.map((item) => item.id) },
            },
            required: ['section'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute(input) {
            const section = (input as { section?: string })?.section;
            if (!nav.some((item) => item.id === section))
              throw new Error('未知工作区');
            setView(section as View);
            return { section, status: 'opened' };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);
  return (
    <main className="app-shell">
      <div className="top-rule" />
      <button className="mode-switch workbench-mode-switch" onClick={onReport}>
        返回报告
      </button>
      <aside className="sidebar">
        <Wordmark />
        <p className="sidebar-label">工作区</p>
        <nav aria-label="工作台导航">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={view === item.id ? 'active' : ''}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </button>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <span>DEMO · 2026</span>
          <p>所有数据均为界面演示，不构成投资建议。</p>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button className="mobile-brand" onClick={() => setView('brief')}>
            <span>A</span>Alpha 派
          </button>
          <div className="crumb">
            <span>我的投研工作台</span>
            <ArrowRight size={13} />
            <b>{title}</b>
          </div>
          <label className="global-search">
            <Search size={15} />
            <input aria-label="全局搜索" placeholder="搜索公司、材料或对话" />
          </label>
          <div className="today">
            <span className="live-dot">LIVE</span>
            <b>9 月 4 日 · 周五</b>
          </div>
        </header>
        <Workflow current={view} onPick={setView} />
        <div className="content-scroll">
          {view === 'brief' && (
            <BriefView onResearch={() => setView('research')} />
          )}{' '}
          {view === 'research' && <ResearchView />}
          {view === 'tracking' && (
            <TrackingView goCalendar={() => setView('calendar')} />
          )}{' '}
          {view === 'calendar' && <CalendarView />}
          {view === 'skills' && <SkillsView />}
          {view === 'ledger' && <LedgerView />}
        </div>
      </div>
    </main>
  );
}

function DemoFrame({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div className="demo-frame">
      <div className="demo-frame__bar">
        <span className="demo-frame__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <b>{title}</b>
        <span>{hint}</span>
        <em>INTERACTIVE DEMO</em>
      </div>
      <div className="demo-frame__body">{children}</div>
    </div>
  );
}

function MiniBriefDemo() {
  const [edition, setEdition] = useState<'cn' | 'global'>('cn');
  const [scheduled, setScheduled] = useState(true);
  return (
    <div className="alpha-demo mini-brief">
      <div className="alpha-demo-bar">
        <b>蓝宝书</b>
        <span>PaiPai 总结的每日必看</span>
        <small>更新于 00:16</small>
      </div>
      <div className="alpha-editions">
        <button
          className={edition === 'cn' ? 'active' : ''}
          onClick={() => setEdition('cn')}
        >
          国内 · 9 月 4 日晚间版
        </button>
        <button
          className={edition === 'global' ? 'active' : ''}
          onClick={() => setEdition('global')}
        >
          全球 · 9 月 4 日全球版
        </button>
        <label>
          <Switch checked={scheduled} onCheckedChange={setScheduled} />
          {scheduled ? '定时任务运行中' : '定时任务已暂停'}
        </label>
      </div>
      <div className="alpha-brief-grid">
        <div>
          <div className="alpha-tabs">
            <b>机构热议</b>
            <span>推荐</span>
            <span>自选</span>
            <span>分析师</span>
          </div>
          {headlines.slice(0, 4).map((item, i) => (
            <article key={item[0]}>
              <em>{i + 1}</em>
              <div>
                <b>
                  {edition === 'global' && i === 0
                    ? '海外 AI 基础设施资本开支继续上修'
                    : item[1]}
                </b>
                <p>
                  {i === 0
                    ? '汇总公司披露与机构观点，识别需要继续深挖的分歧。'
                    : '跨来源信息摘要，可继续进入 PaiWork 查看原文。'}
                </p>
                <span>{item[2]}</span>
                <span>{item[3]}</span>
              </div>
              <small>{'🔥'.repeat(Math.max(2, 5 - i))}</small>
            </article>
          ))}
        </div>
        <aside>
          <b>热搜个股</b>
          {watchlist.slice(0, 5).map((s, i) => (
            <div key={s[0]}>
              <em>{i + 1}</em>
              <span>
                {s[0]}
                <small>{s[1]}</small>
              </span>
              <strong className={s[3] ? 'alpha-rise' : 'alpha-fall'}>
                {s[2]}
              </strong>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

function MiniResearchDemo() {
  const [source, setSource] = useState('HVDC柜外电源');
  const sources = ['HVDC柜外电源', 'Jefferies 2026-06', '美银美林 2026-05'];
  return (
    <div className="alpha-demo mini-research">
      <aside className="alpha-tree">
        <b>PaiWork</b>
        <button>＋ 新建会话</button>
        <button>◷ 定时任务</button>
        <p>工作区</p>
        {[
          '电力设备个股资料',
          '纪要',
          '专家交流',
          '公司交流',
          '研报',
          '公告',
        ].map((x, i) => (
          <span className={i === 1 ? 'selected' : ''} key={x}>
            {i === 0 ? '⌄' : '　'}
            {x}
          </span>
        ))}
      </aside>
      <div className="alpha-chat">
        <header>26—30 年芯片年装机量预期</header>
        <div className="alpha-query">
          26—30 年，目前市场预期每年的芯片装机量是多少？
        </div>
        <h4>PaiPai 已完成回答</h4>
        <b>
          核心结论：市场对 2026—2030
          年芯片功率口径的年度装机量预测，因统计口径不同而差异较大。
        </b>
        <ul>
          <li>纯芯片功耗口径：适合对比加速器出货。</li>
          <li>服务器新增口径：适合观察实际部署节奏。</li>
          <li>数据中心总装机口径：适合评估基础设施需求。</li>
        </ul>
        <div className="alpha-source-row">
          {sources.map((x) => (
            <button
              className={source === x ? 'active' : ''}
              onClick={() => setSource(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
        <label>
          <input
            aria-label="继续追问"
            placeholder="输入文字提问，或通过 / 唤醒 Skills"
          />
          <button>↑</button>
        </label>
      </div>
      <article className="alpha-doc">
        <header>
          {source}.md <button>存入在侧工作区</button>
        </header>
        <h3>HVDC 柜外电源侧：主要玩家、谷歌链/英伟达链归属与订单份额梳理</h3>
        <blockquote>
          “柜外电源”是 AI 数据中心从传统 UPS 向 HVDC 演进的核心环节。
        </blockquote>
        <h4>一、核心结论</h4>
        <p>国内 HVDC 柜外电源格局高度集中；两条供应链的分歧正在形成。</p>
        <p>
          订单看点需要区分技术认证、小批量与稳定交付，不直接把合作关系等同于份额。
        </p>
        <footer>引用位置：第 12 页 · 段落 4　｜　私人材料</footer>
      </article>
    </div>
  );
}

function MiniTrackingDemo() {
  const [stock, setStock] = useState(0);
  const [calendar, setCalendar] = useState(false);
  const [activeEvent, setActiveEvent] = useState(3);
  const [feedFilter, setFeedFilter] = useState('全部');
  const [mineOnly, setMineOnly] = useState(true);
  const [calendarTab, setCalendarTab] = useState('我的日历');
  const selectedStock = watchlist[stock];
  const eventPoints = [
    { x: 118, y: 142, mark: '纪', type: '纪要', title: '专家交流：数据中心电源需求拆解' },
    { x: 228, y: 128, mark: '报', type: '研报', title: 'AIDC 配电环节核心标的深度跟踪' },
    { x: 338, y: 86, mark: '调', type: '调研', title: '投资者关系活动记录表' },
    { x: 474, y: 65, mark: '点', type: '点评', title: 'Q2 毛利率阶段性承压，数据中心业务高增' },
    { x: 594, y: 106, mark: '公', type: '公告', title: '2026 年中报：800VDC 进入交付验证' },
  ];
  const feed = [
    ['21小时前', '点评', `${selectedStock[0]} Q2毛利率阶段性承压，数中心业务驱动收入高增`, '招商证券'],
    ['08—28', '纪要', `${selectedStock[1]} 2026年08月28日投资者关系活动记录表`, '高管出席'],
    ['08—28', '研报', `${selectedStock[0]} 2026年中报点评：数据中心电源加速推进`, '东吴证券'],
    ['08—27', '点评', `【${selectedStock[0]}】26H1点评`, '中信建投'],
  ];
  return (
    <div className="alpha-demo mini-tracking">
      <div className="alpha-demo-bar">
        <b>{calendar ? '研究日历' : selectedStock[0]}</b>
        <span>
          {calendar
            ? '08—28 周五 · 7 场路演'
            : `${selectedStock[1]}　${selectedStock[2]}`}
        </span>
        <button onClick={() => setCalendar(!calendar)}>
          {calendar ? '返回个股全景' : '打开研究日历'}
        </button>
      </div>
      {calendar ? (
        <div className="alpha-calendar-shell">
          <div className="alpha-calendar-toolbar">
            <label>
              <Search size={13} />
              <input placeholder="搜索活动" aria-label="搜索研究活动" />
            </label>
            <button>回今天</button>
            <b>‹　08—28 周五　›</b>
            <label className="alpha-calendar-switch">
              <Switch checked={mineOnly} onCheckedChange={setMineOnly} />
              订阅自选
            </label>
          </div>
          <div className="alpha-calendar-tabs">
            {['全市场活动', '我的日历', 'A股业绩日历', '港股业绩日历', '美股业绩日历'].map(
              (tab) => (
                <button
                  className={calendarTab === tab ? 'active' : ''}
                  onClick={() => setCalendarTab(tab)}
                  key={tab}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
          <div className="alpha-calendar">
            <aside>
              <b>全部日程　{mineOnly ? 7 : 12}</b>
              {['路演　7', '调研　0', '策略会　0', '行业论坛　0'].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </aside>
            <div>
              <div className="alpha-time-axis">
                {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30'].map(
                  (x) => <span key={x}>{x}</span>,
                )}
              </div>
              {[
                ['08:00', '兴业地产', '新城控股：合理估值水平在哪里'],
                ['09:00', '长江电新', '科士达2026年半年报业绩交流会'],
                ['10:00', '长江电新', '国电南瑞2026年中报业绩交流会'],
              ].map((x, i) => (
                <article style={{ gridColumn: i * 2 + 1 }} key={x[2]}>
                  <small>{x[0]}　{x[1]}</small>
                  <b>{x[2]}</b>
                  <span>🎧 已订阅 · 关联材料</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="alpha-track-grid">
          <aside>
            <label className="alpha-watch-search">
              <Search size={12} />
              <input aria-label="搜索股票" placeholder="搜索股票名称/代码" />
            </label>
            <div className="alpha-watch-head">
              <b>全部自选</b>
              <span>最新价　涨幅</span>
            </div>
            {watchlist.slice(0, 7).map((s, i) => (
              <button
                className={stock === i ? 'selected' : ''}
                onClick={() => setStock(i)}
                key={s[0]}
              >
                <span>
                  <b>{s[0]}</b>
                  <small>{s[1]}</small>
                </span>
                <strong className={s[3] ? 'alpha-rise' : 'alpha-fall'}>
                  {s[2]}
                </strong>
              </button>
            ))}
          </aside>
          <div className="alpha-chart">
            <nav>
              <b>全景</b>
              <span>优秀分析师</span>
              <span>研究活动</span>
              <span>QA</span>
              <span>纪要</span>
              <span>研报</span>
              <span>资讯</span>
            </nav>
            <div className="alpha-chart-tools">
              <span>分时　五日　<b>日K</b>　周K　月K　| 1Y</span>
              <span>研究事件　→ 归母净利润</span>
            </div>
            <div className="alpha-event-legend" aria-label="研究事件图例">
              <small>点击标记查看当时材料</small>
              {eventPoints.map((event, i) => (
                <button
                  className={activeEvent === i ? 'active' : ''}
                  onClick={() => setActiveEvent(i)}
                  key={event.type}
                >
                  <i>{event.mark}</i>
                  {event.type}
                </button>
              ))}
            </div>
            <svg
              viewBox="0 0 680 250"
              role="img"
              aria-label="股价K线与研究事件叠加图"
            >
              <g stroke="#e8ebf0">
                {[35, 75, 115, 155, 195].map((y) => (
                  <line key={y} x1="15" x2="665" y1={y} y2={y} />
                ))}
              </g>
              {Array.from({ length: 30 }).map((_, i) => {
                const x = 24 + i * 20.5;
                const base =
                  170 - Math.sin(i * 0.7) * 22 - i * 2.1 +
                  (i > 20 ? (i - 20) * 5 : 0);
                const rising = i % 3 !== 0;
                return (
                  <g key={i}>
                    <line x1={x} x2={x} y1={base - 13} y2={base + 15} stroke={rising ? '#ef6464' : '#32ad83'} />
                    <rect x={x - 3} y={base - 5} width="6" height="12" fill={rising ? '#ef6464' : '#32ad83'} />
                  </g>
                );
              })}
              <path d="M24 163 L118 70 L228 177 L338 118 L474 92 L594 80" fill="none" stroke="#ffad66" strokeWidth="2" />
              {eventPoints.map((event, i) => (
                <g
                  key={event.x}
                  role="button"
                  tabIndex={0}
                  className={activeEvent === i ? 'active-event' : ''}
                  onClick={() => setActiveEvent(i)}
                >
                  <title>{`${event.type}：${event.title}`}</title>
                  <circle cx={event.x} cy={event.y} r="11" fill="white" stroke="#367bf5" />
                  <text
                    x={event.x}
                    y={event.y + 3}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#367bf5"
                  >
                    {event.mark}
                  </text>
                </g>
              ))}
              <g opacity=".55">
                {Array.from({ length: 38 }).map((_, i) => (
                  <rect key={i} x={20 + i * 16.5} y={221 - (i % 6) * 4} width="8" height={12 + (i % 6) * 4} fill={i % 3 ? '#efaaa7' : '#9dd9c3'} />
                ))}
              </g>
            </svg>
            <div className="alpha-chart-years">
              <span>2025—10</span><span>2026—01</span><span>2026—04</span><span>2026—08</span>
            </div>
          </div>
          <section>
            <b>研究事件 <small>2026—08—27</small></b>
            <span>{eventPoints[activeEvent].type} · 已归档</span>
            <h4>{eventPoints[activeEvent].title}</h4>
            <p>点击图中事件标记，在行情与当时的研究材料之间切换。</p>
          </section>
          <div className="alpha-feed">
            <div className="alpha-feed-tabs">
              <b>最新跟踪</b>
              {['全部', '外资观点', '精选点评', '纪要', '研报'].map((x) => (
                <button className={feedFilter === x ? 'active' : ''} onClick={() => setFeedFilter(x)} key={x}>{x}</button>
              ))}
            </div>
            {feed
              .filter((x) => feedFilter === '全部' || x[1] === feedFilter.replace('精选', ''))
              .map((x, i) => (
                <button className="alpha-feed-row" onClick={() => setActiveEvent(Math.min(i, eventPoints.length - 1))} key={x[2]}>
                  <time>{x[0]}</time><em>{x[1]}</em><b>{x[2]}</b><small>{x[3]}</small>
                </button>
              ))}
          </div>
          <div className="alpha-activities">
            <header><b>研究活动</b><span>未来14天 · 2场</span></header>
            <article><small>明天 08:00　兴证电新</small><b>2026 研究巡礼：{selectedStock[0]} 业务展望</b></article>
            <article><small>09—10　湖润新质</small><b>秋季上市公司闭门会</b></article>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniSkillsDemo() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(skills.map((s) => [s[0], s[3]])),
  );
  return (
    <div className="alpha-demo mini-skills">
      <div className="alpha-demo-bar">
        <b>Skills</b>
        <span>全部　机构专属　我的</span>
        <label>
          <Search size={14} />
          <input
            aria-label="搜索 Skill"
            placeholder="搜索 Skill 名称、描述或发布者"
          />
        </label>
      </div>
      <div className="alpha-featured">
        <b>研选　平台精选优质技能</b>
        <span>1 / 2</span>
        {skills.slice(0, 4).map((s) => (
          <article key={s[0]}>
            <b>{s[0]}</b>
            <p>{s[1]}</p>
            <small>
              {s[2]}　🔥 {s[4]}
            </small>
          </article>
        ))}
      </div>
      <div className="alpha-market">
        <header>
          <b>广场</b>
          <span>来源　官方　用户　　状态　已启用　未启用</span>
        </header>
        {skills.slice(0, 6).map((s, i) => (
          <article key={s[0]}>
            <span className="alpha-skill-icon">{i < 5 ? 'A' : '研'}</span>
            <div>
              <b>{s[0]}</b>
              <p>{s[1]}</p>
              <small>PaiPai　🔥 {s[4]}</small>
            </div>
            <Switch
              checked={enabled[s[0]]}
              onCheckedChange={(checked) =>
                setEnabled((v) => ({ ...v, [s[0]]: checked }))
              }
            />
          </article>
        ))}
      </div>
    </div>
  );
}

function ResearchWorkflowDiagram() {
  const nodes = [
    { n: '01', x: 48, y: 80, actor: 'HUMAN', title: 'Idea 产生', detail: '卖方 · 公众号 · 博客', owner: '人提出方向' },
    { n: '02', x: 224, y: 80, actor: 'AI', title: '信息收集与初判', detail: '广泛扫描 · 去重压缩', owner: 'AI 扩大视野' },
    { n: '03', x: 400, y: 80, actor: 'AI', title: '深度研究', detail: '多源证据 · 私人材料', owner: 'AI 组织证据' },
    { n: '04', x: 576, y: 80, actor: 'HUMAN', title: '投资决策', detail: '权衡分歧 · 承担结果', owner: '人作出判断', focal: true },
    { n: '05', x: 752, y: 80, actor: 'AI', title: '持续跟踪', detail: '公告 · 点评 · 研究事件', owner: 'AI 降低遗漏' },
    { n: '06', x: 928, y: 80, actor: 'HUMAN', title: '迭代认知', detail: '校正框架 · 更新决策', owner: '人更新认知' },
  ];
  return (
    <div className="workflow-figure">
      <header>
        <p>RESEARCH WORKFLOW</p>
        <h3>从信息爆炸，到持续更新决策</h3>
        <span>AI 负责压缩复杂度，人负责关键判断</span>
      </header>
      <svg
        className="workflow-diagram"
        viewBox="0 0 1120 288"
        role="img"
        aria-labelledby="research-workflow-title research-workflow-desc"
      >
        <title id="research-workflow-title">投研工作流</title>
        <desc id="research-workflow-desc">六个阶段展示从 Idea 产生、信息收集、深度研究、投资决策、持续跟踪到迭代认知的人机分工与反馈闭环。</desc>
        <defs>
          <marker id="workflow-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#496a62" />
          </marker>
          <marker id="workflow-arrow-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#b84f45" />
          </marker>
          <marker id="workflow-arrow-link" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#1b433a" />
          </marker>
        </defs>
        <rect width="1120" height="288" fill="#f4efe3" />
        <rect x="24" y="48" width="1072" height="168" fill="#dce6df" opacity=".45" />

        <line x1="192" x2="224" y1="132" y2="132" stroke="#496a62" strokeWidth="2" markerEnd="url(#workflow-arrow)" />
        <line x1="368" x2="400" y1="132" y2="132" stroke="#496a62" strokeWidth="2" markerEnd="url(#workflow-arrow)" />
        <line x1="544" x2="576" y1="132" y2="132" stroke="#b84f45" strokeWidth="2" markerEnd="url(#workflow-arrow-accent)" />
        <line x1="720" x2="752" y1="132" y2="132" stroke="#b84f45" strokeWidth="2" markerEnd="url(#workflow-arrow-accent)" />
        <line x1="896" x2="928" y1="132" y2="132" stroke="#496a62" strokeWidth="2" markerEnd="url(#workflow-arrow)" />
        <path d="M1072 132 H1080 Q1088 132 1088 140 V248 Q1088 256 1080 256 H128 Q120 256 120 248 V184" fill="none" stroke="#1b433a" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#workflow-arrow-link)" />
        <rect x="512" y="232" width="160" height="16" fill="#f4efe3" />
        <text x="592" y="244" textAnchor="middle" fill="#1b433a" fontSize="8" fontFamily="var(--mono)" letterSpacing="1">认知进入下一轮</text>

        {nodes.map((node) => (
          <g key={node.n}>
            <rect x={node.x} y={node.y} width="144" height="104" fill={node.focal ? '#ead3cc' : node.actor === 'AI' ? '#cbdad1' : '#f4efe3'} stroke={node.focal ? '#b84f45' : '#28564c'} strokeWidth={node.focal ? '2' : '1.5'} />
            <rect x={node.x + 12} y={node.y + 12} width="40" height="16" fill={node.focal ? '#b84f45' : '#1b433a'} />
            <text x={node.x + 32} y={node.y + 24} textAnchor="middle" fill="#f4efe3" fontSize="8" fontWeight="700" fontFamily="var(--mono)" letterSpacing="1">{node.actor}</text>
            <text x={node.x + 132} y={node.y + 24} textAnchor="end" fill={node.focal ? '#b84f45' : '#496a62'} fontSize="8" fontWeight="700" fontFamily="var(--mono)">{node.n}</text>
            <text x={node.x + 12} y={node.y + 52} fill="#173c34" fontSize="16" fontWeight="700" fontFamily="var(--serif)">{node.title}</text>
            <text x={node.x + 12} y={node.y + 72} fill="#496a62" fontSize="8" fontFamily="var(--sans)">{node.detail}</text>
            <text x={node.x + 12} y={node.y + 92} fill={node.focal ? '#a33f37' : '#28564c'} fontSize="8" fontWeight="700" fontFamily="var(--sans)">{node.owner}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function Report() {
  return (
    <main className="report-page">
      <div className="report-top-rule" />
      <header className="report-header">
        <div>
          <p className="report-eyebrow">ALPHA PAI · WORKFLOW INSIGHT</p>
          <h1>Alpha派 x 投研场景用户调研</h1>
        </div>
      </header>
      <nav className="report-nav">
        <a href="#workflow">01 工作流</a>
        <a href="#discovery">02 信息发现</a>
        <a href="#research">03 深度研究</a>
        <a href="#tracking">04 持续跟踪</a>
      </nav>
      <section className="report-section" id="workflow">
        <p className="report-kicker">01 · MY WORKFLOW</p>
        <h2>投研工作流</h2>
        <div className="report-heading-rule" />
        <ResearchWorkflowDiagram />
        <p className="report-body">
          投研是典型的高频、长文本、重推理场景。基金经理、研究员每天在处理海量的非结构化数据，海量的交流，最大的痛点就是信息爆炸，但同时，这些数据对AI来说都是非常好的语料和上下文。
        </p>
        <p className="report-note">
          <strong>Insight：</strong>AI
          最有价值的位置，不是直接替代投资决策，而是压缩信息处理成本、保留完整证据，并把人的注意力推向真正需要判断的分歧。
        </p>
      </section>
      <section className="report-section" id="discovery">
        <p className="report-kicker">02 · DISCOVERY</p>
        <h2>①② 信息收集与初步判断</h2>
        <div className="report-heading-rule" />
        <p className="report-body">
          工作流中的①②本质上都是对信息进行广泛的收集与处理。Alpha派的蓝宝书可以提供市场上优质的信息总结，也提供了定时任务这个功能接口，让用户可以在Paiwork中通过agent设置每日搜索并整理重点信息的任务。
        </p>
        <figure>
          <figcaption>
            <b>交互 Demo 01</b>
          </figcaption>
          <DemoFrame title="Alpha 派 · 蓝宝书" hint="版本切换 / 定时任务">
            <MiniBriefDemo />
          </DemoFrame>
        </figure>
      </section>
      <section className="report-section" id="research">
        <p className="report-kicker">03 · DEEP RESEARCH</p>
        <h2>③ 深度研究与私人知识工作台</h2>
        <div className="report-heading-rule" />
        <p className="report-body">
          工作流中的③深度研究，对信息的收集和处理的要求呈现几何级的提升。Alpha派覆盖公告与定期报告、官方路演、会议纪要、境内外研报、券商点评、机构讨论等内容。对投研用户而言，这比通用网页搜索更接近真实的信息结构：同一个问题往往需要同时查看公司披露、机构解释和市场分歧。
        </p>
        <p className="report-body">
          此外，paiwork的工作台参考了codex+obsidian，可以让用户上传海量的私人非公开数据，并且做到准确溯源，可以看到引用句及上下文、标题、日期、机构、文档类型、页码或原始链接，以及是否来自私人材料。
        </p>
        <figure>
          <figcaption>
            <b>交互 Demo 02</b>
          </figcaption>
          <DemoFrame title="Alpha 派 · PaiWork" hint="对话 / 证据联动">
            <MiniResearchDemo />
          </DemoFrame>
        </figure>
        <p className="report-note">
          <strong>边界：</strong>
          准确溯源不只是“给一个链接”，而是让用户能回到引用句、上下文、页码与材料权限，判断结论是否真的被证据支持。
        </p>
      </section>
      <section className="report-section" id="tracking">
        <p className="report-kicker">04 · CONTINUOUS TRACKING</p>
        <h2>⑤ 持续跟踪</h2>
        <div className="report-heading-rule" />
        <p className="report-body">
          工作流⑤，持续跟踪：alpha的跟踪看板做的非常好，覆盖日常公告、事件、卖方点评、研究事件，通过一个看板就可以完成对覆盖公司的全部跟踪，而且也有对应的日历功能
        </p>
        <figure>
          <figcaption>
            <b>交互 Demo 03</b>
          </figcaption>
          <DemoFrame title="Alpha 派 · 跟踪看板" hint="事件叠加 / 跟踪流 / 研究日历">
            <MiniTrackingDemo />
          </DemoFrame>
        </figure>
        <p className="report-note">
          <strong>结论：</strong>Alpha
          派真正的产品机会，不只是做一个更懂金融的问答框，而是把信息发现、深度研究、持续跟踪与方法复用连接成一条不断积累的投研工作流。
        </p>
      </section>
      <footer className="report-footer">
        <span>ALPHA PAI INSIGHT · INTERACTIVE REPORT</span>
      </footer>
    </main>
  );
}

export default function Home() {
  return <Report />;
}
