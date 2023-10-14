// src/server/mockData/ProfileStore.ts

export interface Profile {
    name: string;
    interests: string;
    about: string;
}

export class ProfileStore {
    private profiles: { [id: string]: Profile } = {};

    create(id: string, profile: Profile) {
      this.profiles[id] = profile;
      return this.profiles[id];
    }

    get(id: string): Profile | undefined {
      return this.profiles[id];
    }
}
