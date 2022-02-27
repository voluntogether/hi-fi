import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';
import {services} from '../services';
import {restartApp} from '../utils/help';

export class UIStore implements IStore {
  appLaunches = 0;
  incAppLaunces = (v = 1): void => {
    this.appLaunches += v;
  };

  isSystemAppearance = true;
  appearance: AppearanceMode = 'light';
  // isSystemAppearance = false;
  // appearance: AppearanceMode = 'dark';
  setAppearanceMode = (v: UIAppearance): void => {
    this.isSystemAppearance = v === 'System';
    this.appearance = this.appearanceFromUIToInternal(v);

    restartApp();
  };
  get appearanceName(): UIAppearance {
    return this.isSystemAppearance ? 'System' : this.appearanceFromInternalToUI(this.appearance);
  }
  private appearanceFromInternalToUI = (v: AppearanceMode): UIAppearance => {
    return v === 'light' ? 'Light' : 'Dark';
  };
  private appearanceFromUIToInternal = (v: UIAppearance): AppearanceMode => {
    return v === 'Light' ? 'light' : 'dark';
  };

  isSystemLanguage = true;
  language: Language = 'en';
  setLanguage = (v: UILanguage): void => {
    this.isSystemLanguage = v === 'System';
    this.language = this.languageFromUIToInternal(v);

    restartApp();
  };
  get languageName(): UILanguage {
    return this.isSystemLanguage ? 'System' : this.languageFromInternalToUI(this.language);
  }
  private languageFromInternalToUI = (v: Language): UILanguage => {
    return v === 'en' ? 'English' : 'Russian';
  };
  private languageFromUIToInternal = (v: UILanguage): Language => {
    return v === 'English' ? 'en' : 'ru';
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: UIStore.name,
      // properties: [],
      properties: [
        'appLaunches',
        'isSystemAppearance',
        'appearance',
        'isSystemLanguage',
        'language',
      ],
    });
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
