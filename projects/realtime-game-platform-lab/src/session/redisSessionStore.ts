import Redis from "ioredis";

export interface ReconnectSnapshot {
  accountId: string;
  roomId: string;
  matchId: string;
  actionSeq: number;
  updatedAt: string;
}

export class RedisSessionStore {
  constructor(
    private readonly redis: Redis,
    private readonly ttlSeconds = 120
  ) {}

  private key(accountId: string) {
    return `game:session:${accountId}`;
  }

  async save(snapshot: ReconnectSnapshot): Promise<void> {
    await this.redis.set(
      this.key(snapshot.accountId),
      JSON.stringify(snapshot),
      "EX",
      this.ttlSeconds
    );
  }

  async load(accountId: string): Promise<ReconnectSnapshot | null> {
    const raw = await this.redis.get(this.key(accountId));
    return raw ? JSON.parse(raw) as ReconnectSnapshot : null;
  }

  async clear(accountId: string): Promise<void> {
    await this.redis.del(this.key(accountId));
  }
}
