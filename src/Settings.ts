import { App, PluginSettingTab } from "obsidian";
import { add_toggle} from 'components/SettingsComponents';
import DBFolderPlugin from 'main';


export interface DatabaseSettings {
    enable_debug_mode: boolean;
}

export const DEFAULT_SETTINGS: DatabaseSettings = {
    enable_debug_mode: false,
};

export type SettingRetriever = <K extends keyof DatabaseSettings>(
    key: K,
    supplied?: DatabaseSettings
  ) => DatabaseSettings[K];
  
  export interface SettingRetrievers {
    getGlobalSettings: () => DatabaseSettings;
    getGlobalSetting: SettingRetriever;
    getSetting: SettingRetriever;
  }
  
export interface SettingsManagerConfig {
    onSettingsChange: (newSettings: DatabaseSettings) => void;
  }

  export class SettingsManager {
    app: App;
    plugin: DBFolderPlugin;
    config: SettingsManagerConfig;
    settings: DatabaseSettings;
    cleanupFns: Array<() => void> = [];
    applyDebounceTimer: number = 0;
  
    constructor(
      plugin: DBFolderPlugin,
      config: SettingsManagerConfig,
      settings: DatabaseSettings
    ) {
      this.app = plugin.app;
      this.plugin = plugin;
      this.config = config;
      this.settings = settings;
    }
    constructUI(containerEl: HTMLElement, heading: string, local: boolean) {
        this.developer_settings(containerEl)
    }
    /**
     * developer settings section
     */
     developer_settings(containerEl: HTMLElement): void {
        // title of the section
        this.add_setting_header(containerEl,"Developer section",'h3');
        // Enable or disable debug mode
        let debug_togle_promise = async (value: boolean): Promise<void> => {
            await this.plugin.updateSettings({ enable_debug_mode: value });
        }
        add_toggle(
            containerEl,
            "Enable debug mode", 
            "This will log all the errors and warnings in the console",
            this.plugin.settings.enable_debug_mode, 
            debug_togle_promise);
    }

    /**
     * Add a header to the settings tab
     */
    add_setting_header(containerEl: HTMLElement,tittle: string,level: keyof HTMLElementTagNameMap = 'h2'): void{
        containerEl.createEl(level, {text: tittle});
    }
}
export class DBFolderSettingTab extends PluginSettingTab {
    plugin: DBFolderPlugin;
    settingsManager: SettingsManager;
	constructor(plugin: DBFolderPlugin, config: SettingsManagerConfig) {
        super(plugin.app, plugin);
        this.plugin = plugin;
        this.settingsManager = new SettingsManager(plugin, config, plugin.settings);
    }

	display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.addClass('board-settings-modal');
        
        this.settingsManager.constructUI(containerEl,'Kanban Plugin', false);
	}
}