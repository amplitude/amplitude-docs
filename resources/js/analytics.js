import * as amplitude from '@amplitude/analytics-browser';
import { defaultEventTrackingAdvancedPlugin } from '@amplitude/plugin-default-event-tracking-advanced-browser';



const plugin = defaultEventTrackingAdvancedPlugin();

  amplitude.add(plugin);

  amplitude.init("f9c875dad5a9fab47a3ac9882222d5c2", {
    defaultTracking: true,
  });