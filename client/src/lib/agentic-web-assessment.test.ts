import {
  BOOK_CALL_URL,
  DEFAULT_READINESS,
  evaluateAssessment,
  isValidWebsite,
  recommendPackage,
  scoreLabel,
  totalScore,
  validateStep1,
  type ActionId,
  type AssessmentInput,
  type ReadinessValue,
} from './agentic-web-assessment.ts';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function allYes() {
  return {
    contentCurrent: 'yes',
    ownerApproves: 'yes',
    digitalTools: 'yes',
    systemAccess: 'yes',
    humanHandoff: 'yes',
  } as const;
}

function makeInput(partial: Partial<AssessmentInput> & { actions: ActionId[] }): AssessmentInput {
  return {
    website: 'https://acmeplumbing.com',
    businessType: 'home-services',
    readiness: { ...DEFAULT_READINESS },
    ...partial,
  };
}

const tests: Array<[string, () => void]> = [
  ['only answers → Foundation', () => {
    assert(recommendPackage(['answers']) === 'foundation', 'expected foundation');
  }],
  ['answers + book → Conversion', () => {
    assert(recommendPackage(['answers', 'book']) === 'conversion', 'expected conversion');
  }],
  ['answers + leads → Conversion', () => {
    assert(recommendPackage(['answers', 'leads']) === 'conversion', 'expected conversion');
  }],
  ['answers + book + leads → Conversion', () => {
    assert(recommendPackage(['answers', 'book', 'leads']) === 'conversion', 'expected conversion');
  }],
  ['book only (no answers) → Conversion', () => {
    assert(recommendPackage(['book']) === 'conversion', 'expected conversion');
  }],
  ['leads + book without answers → Conversion', () => {
    assert(recommendPackage(['leads', 'book']) === 'conversion', 'expected conversion');
  }],
  ['answers + quotes → Operations', () => {
    assert(recommendPackage(['answers', 'quotes']) === 'operations', 'expected operations');
  }],
  ['payment only → Operations', () => {
    assert(recommendPackage(['payment']) === 'operations', 'expected operations');
  }],
  ['status + book → Operations', () => {
    assert(recommendPackage(['status', 'book']) === 'operations', 'expected operations');
  }],
  ['all six actions → Operations', () => {
    assert(
      recommendPackage(['answers', 'book', 'leads', 'quotes', 'status', 'payment']) === 'operations',
      'expected operations'
    );
  }],
  ['score 5×yes + 1 action = 84 Strong starting point', () => {
    const result = evaluateAssessment(makeInput({ actions: ['answers'], readiness: { ...allYes() } }));
    assert(result.score === 84, `score ${result.score}`);
    assert(result.label === 'Strong starting point', result.label);
    assert(result.packageId === 'foundation', result.packageId);
  }],
  ['score 5×not sure + 1 action = 44 Foundation first', () => {
    const result = evaluateAssessment(makeInput({ actions: ['answers'] }));
    assert(result.score === 44, `score ${result.score}`);
    assert(result.label === 'Foundation first', result.label);
    assert(result.discovery.length === 5, `discovery ${result.discovery.length}`);
  }],
  ['score 5×yes + 6 actions caps at 100', () => {
    const result = evaluateAssessment(
      makeInput({
        actions: ['answers', 'book', 'leads', 'quotes', 'status', 'payment'],
        readiness: { ...allYes() },
      })
    );
    assert(result.readinessPoints === 80, `ready ${result.readinessPoints}`);
    assert(result.opportunityPoints === 24, `opp ${result.opportunityPoints}`);
    assert(result.score === 100, `score ${result.score}`);
    assert(totalScore(80, 24) === 100, 'cap failed');
  }],
  ['score 4×yes + 1×not sure + 1 action = 76 Ready to map', () => {
    const readiness = {
      ...allYes(),
      humanHandoff: 'not_sure' as ReadinessValue,
    };
    const result = evaluateAssessment(makeInput({ actions: ['book'], readiness }));
    assert(result.score === 76, `score ${result.score}`);
    assert(result.label === 'Ready to map', result.label);
    assert(result.packageId === 'conversion', result.packageId);
    assert(result.discovery.length === 1, 'one discovery item');
    assert(result.discovery[0].answer === 'not_sure', 'not sure flag');
  }],
  ['No answers are discovery items, not failures', () => {
    const readiness = {
      contentCurrent: 'no',
      ownerApproves: 'no',
      digitalTools: 'no',
      systemAccess: 'no',
      humanHandoff: 'no',
    } as const;
    const result = evaluateAssessment(makeInput({ actions: ['quotes'], readiness }));
    assert(result.score === 14, `score ${result.score}`);
    assert(result.packageId === 'operations', result.packageId);
    assert(result.discovery.length === 5, 'all five');
    assert(
      result.discovery.every((d) => d.guidance.length > 20 && !/fail/i.test(d.guidance)),
      'guidance should be encouraging'
    );
  }],
  ['action plan is written for the prospect and includes the required sections', () => {
    const result = evaluateAssessment(makeInput({ actions: ['answers', 'book'], readiness: { ...allYes() } }));
    const plan = result.actionPlan;
    assert(plan.startsWith('Agentic Web Action Plan'), 'title');
    assert(plan.includes('https://acmeplumbing.com'), 'website');
    assert(plan.includes('Home services & trades'), 'type');
    assert(plan.includes('Selected AI actions'), 'actions heading');
    assert(plan.includes('Answer customer questions'), 'action');
    assert(plan.includes('Book appointments'), 'action 2');
    assert(plan.includes('Readiness score'), 'score heading');
    assert(plan.includes('88 of 100'), 'score');
    assert(plan.includes('Strong starting point'), 'label');
    assert(plan.includes(result.scoreExplanation), 'score explanation');
    assert(plan.includes('Recommended implementation package'), 'package heading');
    assert(plan.includes('Agentic Conversion'), 'package');
    assert(plan.includes('Expected timeline: 3-5 weeks'), 'timeline');
    assert(plan.includes('Proposed first-release scope'), 'scope');
    assert(plan.includes('Discovery items'), 'discovery');
    assert(plan.includes('Recommended next steps'), 'next steps');
    assert(plan.includes('1. '), 'numbered steps');
    assert(plan.includes('foundforai.com'), 'attribution');
    assert(plan.includes(`Discuss this plan with Found For AI. ${BOOK_CALL_URL}`), 'optional cta');
    assert(!/sales summary/i.test(plan), 'must not say sales summary');
    assert(!/\u2014/.test(plan), 'action plan must not contain an em dash');
    assert(!/was not submitted/i.test(plan), 'old privacy line should be gone');
  }],
  ['URL validation accepts bare domains and rejects junk', () => {
    assert(isValidWebsite('foundforai.com') === true, 'bare domain');
    assert(isValidWebsite('https://foundforai.com/path') === true, 'https path');
    assert(isValidWebsite('') === false, 'empty');
    assert(isValidWebsite('not a url') === false, 'spaces');
    assert(isValidWebsite('localhost') === false, 'no dot');
  }],
  ['step 1 validation requires website, type, and an action', () => {
    const empty = validateStep1({ website: '', businessType: '', actions: [] });
    assert(!!empty.website && !!empty.businessType && !!empty.actions, 'all three errors');
    const ok = validateStep1({
      website: 'https://example.com',
      businessType: 'retail',
      actions: ['answers'],
    });
    assert(Object.keys(ok).length === 0, 'should pass');
  }],
];

let failed = 0;
for (const [name, run] of tests) {
  try {
    run();
    console.log(`ok  — ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`fail — ${name}`);
    console.error(err instanceof Error ? err.message : err);
  }
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}

console.log(`\n${tests.length} tests passed`);
