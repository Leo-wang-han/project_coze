'use client';

import { useState } from 'react';
import {
  Building2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
  ChevronDown,
  Heart,
  Shield,
  GraduationCap,
  Plane,
  Coffee,
  FileText,
  Printer,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';

// ============ 数据定义 ============

interface OfferData {
  company: {
    name: string;
    logo: string;
    address: string;
    hrName: string;
    hrPhone: string;
    hrEmail: string;
  };
  candidate: {
    name: string;
    position: string;
    department: string;
    reportingTo: string;
    level: string;
  };
  compensation: {
    baseSalary: number;
    payPeriod: string;
    annualBonus: string;
    signingBonus: number;
    stockOption: string;
  };
  benefits: {
    name: string;
    description: string;
    icon: string;
  }[];
  workArrangement: {
    startDate: string;
    workLocation: string;
    workSchedule: string;
    probationPeriod: string;
  };
  offerExpiry: string;
  offerId: string;
}

const offerData: OfferData = {
  company: {
    name: '星辰科技有限公司',
    logo: 'XC',
    address: '北京市朝阳区望京 SOHO T3 28层',
    hrName: '李雪',
    hrPhone: '010-8888-6666',
    hrEmail: 'hr@xingchen-tech.com',
  },
  candidate: {
    name: '张明远',
    position: '高级前端工程师',
    department: '技术研发部',
    reportingTo: '王建华 / 技术总监',
    level: 'P7',
  },
  compensation: {
    baseSalary: 45000,
    payPeriod: '月薪（税前）',
    annualBonus: '2-4 个月月薪（根据绩效）',
    signingBonus: 30000,
    stockOption: '12000 股期权（4年归属）',
  },
  benefits: [
    {
      name: '五险一金',
      description: '按最高基数缴纳，补充公积金 5%',
      icon: 'shield',
    },
    {
      name: '补充医疗保险',
      description: '覆盖门诊/住院，家属可加入',
      icon: 'heart',
    },
    {
      name: '年度体检',
      description: '每年一次全面健康体检',
      icon: 'heart',
    },
    {
      name: '带薪年假',
      description: '15 天起，每年递增 1 天',
      icon: 'plane',
    },
    {
      name: '学习发展',
      description: '年度培训基金 ¥10,000，技术大会报销',
      icon: 'education',
    },
    {
      name: '弹性工作',
      description: '核心工时 10:00-16:00，其余弹性',
      icon: 'coffee',
    },
  ],
  workArrangement: {
    startDate: '2025年8月1日',
    workLocation: '北京市朝阳区望京 SOHO T3 28层',
    workSchedule: '周一至周五 09:00-18:00（弹性）',
    probationPeriod: '6 个月（薪资不打折）',
  },
  offerExpiry: '2025年7月20日',
  offerId: 'OFF-2025-00386',
};

const benefitIconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-5 w-5" />,
  heart: <Heart className="h-5 w-5" />,
  education: <GraduationCap className="h-5 w-5" />,
  plane: <Plane className="h-5 w-5" />,
  coffee: <Coffee className="h-5 w-5" />,
};

// ============ 子组件 ============

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function CompensationRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? 'text-xl font-bold text-primary' : 'font-medium'}>
        {value}
      </span>
    </div>
  );
}

// ============ 主页面组件 ============

export default function OfferPage() {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [termsOpen, setTermsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleAccept = () => {
    setStatus('accepted');
  };

  const handleDecline = () => {
    setStatus('declined');
  };

  const formatSalary = (amount: number) =>
    new Intl.NumberFormat('zh-CN').format(amount);

  // ---- 已接受状态 ----
  if (status === 'accepted') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-14 w-14 text-emerald-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-emerald-900">
            录用确认已提交
          </h1>
          <p className="mb-2 text-lg text-emerald-700">
            恭喜 {offerData.candidate.name}，您已成功接受
            {offerData.company.name} 的录用邀请！
          </p>
          <p className="mb-10 text-muted-foreground">
            HR 团队将在 1-3 个工作日内与您联系，安排后续入职事宜。
          </p>
          <Card className="mb-8 text-left">
            <CardHeader>
              <CardTitle className="text-lg">下一步</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  1
                </div>
                <div>
                  <p className="font-medium">准备入职材料</p>
                  <p className="text-sm text-muted-foreground">
                    身份证、学历证明、离职证明、银行卡、体检报告
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  2
                </div>
                <div>
                  <p className="font-medium">完成背景调查</p>
                  <p className="text-sm text-muted-foreground">
                    配合第三方机构完成背景调查授权
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  3
                </div>
                <div>
                  <p className="font-medium">按时报到</p>
                  <p className="text-sm text-muted-foreground">
                    于 {offerData.workArrangement.startDate} 到{' '}
                    {offerData.workArrangement.workLocation} 报到
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              打印确认函
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              下载 PDF
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---- 已拒绝状态 ----
  if (status === 'declined') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
            <XCircle className="h-14 w-14 text-slate-400" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-slate-800">
            录用邀请已拒绝
          </h1>
          <p className="mb-10 text-muted-foreground">
            感谢您的回复。如有任何疑问，可随时联系我们的 HR 团队。
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setStatus('pending')}>
              重新考虑
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---- 待确认状态（主页面） ----
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* 顶部进度条 */}
      <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
              {offerData.company.logo}
            </div>
            <div>
              <p className="text-sm font-semibold">{offerData.company.name}</p>
              <p className="text-xs text-muted-foreground">录用通知书</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-xs">
              {offerData.offerId}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Clock className="mr-1 h-3 w-3" />
              截止 {offerData.offerExpiry}
            </Badge>
          </div>
        </div>
        <Progress value={agreed ? 66 : 33} className="h-1 rounded-none" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* 主标题区 */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800">
            <Briefcase className="h-4 w-4" />
            录用通知
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight">
            诚邀您加入 {offerData.company.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            亲爱的 {offerData.candidate.name}，我们非常高兴地向您发出录用邀请
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 左侧：职位与薪资 */}
          <div className="space-y-6 lg:col-span-2">
            {/* 职位信息卡片 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  职位信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
                  <InfoRow
                    icon={<Briefcase className="h-4 w-4" />}
                    label="职位名称"
                    value={offerData.candidate.position}
                  />
                  <InfoRow
                    icon={<Building2 className="h-4 w-4" />}
                    label="所属部门"
                    value={offerData.candidate.department}
                  />
                  <InfoRow
                    icon={<User className="h-4 w-4" />}
                    label="汇报对象"
                    value={offerData.candidate.reportingTo}
                  />
                  <InfoRow
                    icon={<ArrowRight className="h-4 w-4" />}
                    label="职级"
                    value={offerData.candidate.level}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 薪酬福利卡片 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  薪酬福利
                </CardTitle>
                <CardDescription>以下均为税前金额</CardDescription>
              </CardHeader>
              <CardContent>
                {/* 基本薪资高亮 */}
                <div className="mb-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
                  <p className="mb-1 text-sm text-muted-foreground">
                    {offerData.compensation.payPeriod}
                  </p>
                  <p className="text-3xl font-bold text-blue-900">
                    ¥ {formatSalary(offerData.compensation.baseSalary)}
                    <span className="ml-1 text-base font-normal text-muted-foreground">
                      /月
                    </span>
                  </p>
                </div>
                <Separator className="my-2" />
                <CompensationRow
                  label="年薪预估"
                  value={`¥ ${formatSalary(offerData.compensation.baseSalary * 12)} - ${formatSalary(offerData.compensation.baseSalary * 16)}`}
                />
                <CompensationRow
                  label="年终奖金"
                  value={offerData.compensation.annualBonus}
                />
                <CompensationRow
                  label="签字奖金"
                  value={`¥ ${formatSalary(offerData.compensation.signingBonus)}`}
                />
                <CompensationRow
                  label="股权期权"
                  value={offerData.compensation.stockOption}
                />
              </CardContent>
            </Card>

            {/* 福利待遇卡片 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-500" />
                  福利待遇
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {offerData.benefits.map((benefit) => (
                    <div
                      key={benefit.name}
                      className="flex gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {benefitIconMap[benefit.icon] ?? (
                          <Shield className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{benefit.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 工作安排卡片 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  工作安排
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
                  <InfoRow
                    icon={<Calendar className="h-4 w-4" />}
                    label="入职日期"
                    value={offerData.workArrangement.startDate}
                  />
                  <InfoRow
                    icon={<MapPin className="h-4 w-4" />}
                    label="工作地点"
                    value={offerData.workArrangement.workLocation}
                  />
                  <InfoRow
                    icon={<Clock className="h-4 w-4" />}
                    label="工作时间"
                    value={offerData.workArrangement.workSchedule}
                  />
                  <InfoRow
                    icon={<FileText className="h-4 w-4" />}
                    label="试用期"
                    value={offerData.workArrangement.probationPeriod}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 条款与条件 */}
            <Collapsible open={termsOpen} onOpenChange={setTermsOpen}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer select-none hover:bg-muted/30 transition-colors">
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-slate-600" />
                        条款与条件
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform ${termsOpen ? 'rotate-180' : ''}`}
                      />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      1. 本录用通知自发出之日起生效，候选人需在{' '}
                      <strong className="text-foreground">
                        {offerData.offerExpiry}
                      </strong>{' '}
                      前回复确认，逾期将自动失效。
                    </p>
                    <p>
                      2. 录用通知的生效以候选人通过背景调查及入职体检为前提条件。若未通过，公司有权撤回本录用邀请。
                    </p>
                    <p>
                      3. 试用期期间，双方均可按照劳动法规定解除劳动关系，试用期薪资与正式薪资相同。
                    </p>
                    <p>
                      4. 股权期权按照公司期权计划执行，分 4 年归属，每年归属
                      25%，自入职之日起计算。
                    </p>
                    <p>
                      5. 签字奖金将在入职后第一个月随工资一并发放；若在入职 12
                      个月内主动离职，需全额退还。
                    </p>
                    <p>
                      6.
                      本通知中的薪酬福利信息为保密内容，请勿向第三方披露。
                    </p>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>

          {/* 右侧：联系人与操作 */}
          <div className="space-y-6">
            {/* 联系人卡片 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">HR 联系人</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
                    {offerData.company.hrName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{offerData.company.hrName}</p>
                    <p className="text-sm text-muted-foreground">人力资源部</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{offerData.company.hrPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{offerData.company.hrEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{offerData.company.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 确认操作卡片 */}
            <Card className="sticky top-20 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base">确认录用</CardTitle>
                <CardDescription>
                  请仔细阅读以上信息后做出决定
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors hover:bg-muted/50">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    我已仔细阅读并理解本录用通知的所有内容，包括条款与条件
                  </span>
                </label>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={!agreed}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      接受录用
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>确认接受录用邀请</AlertDialogTitle>
                      <AlertDialogDescription>
                        您即将接受{' '}
                        <strong>{offerData.company.name}</strong>{' '}
                        的录用邀请，职位为{' '}
                        <strong>{offerData.candidate.position}</strong>
                        ，入职日期为{' '}
                        <strong>{offerData.workArrangement.startDate}</strong>
                        。确认后将通知 HR 团队，此操作不可撤销。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>再想想</AlertDialogCancel>
                      <AlertDialogAction onClick={handleAccept}>
                        确认接受
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      disabled={!agreed}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      婉拒录用
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>确认拒绝录用邀请</AlertDialogTitle>
                      <AlertDialogDescription>
                        您确定要拒绝{' '}
                        <strong>{offerData.company.name}</strong>{' '}
                        的录用邀请吗？此操作不可撤销，HR
                        团队将收到您的拒绝通知。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDecline}
                        className="bg-destructive text-white hover:bg-destructive/90"
                      >
                        确认拒绝
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 页脚 */}
        <footer className="mt-12 border-t py-6 text-center text-sm text-muted-foreground">
          <p>
            本录用通知由 {offerData.company.name} 发出 · {offerData.offerId}
          </p>
          <p className="mt-1">
            如有疑问，请联系 {offerData.company.hrName}（
            {offerData.company.hrEmail}）
          </p>
        </footer>
      </div>
    </div>
  );
}
