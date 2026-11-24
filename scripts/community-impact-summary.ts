import { buildImpactSummary } from '../client/src/lib/community/impact.ts';
import { getCommunityStore, resetCommunityStoreForTests } from '../lib/community/store.ts';

resetCommunityStoreForTests();
const db = await getCommunityStore().readDatabase();
process.stdout.write(`${buildImpactSummary(db)}\n`);
