/**
 * Automatically generated by expo-modules-autolinking.
 *
 * This autogenerated class provides a list of classes of native Expo modules,
 * but only these that are written in Swift and use the new API for creating Expo modules.
 */

import ExpoModulesCore
import EXConstants
import EASClient
import ExpoFileSystem
import ExpoKeepAwake
import ExpoSystemUI
import EXUpdates

@objc(ExpoModulesProvider)
public class ExpoModulesProvider: ModulesProvider {
  public override func getModuleClasses() -> [AnyModule.Type] {
    return [
      ConstantsModule.self,
      EASClientModule.self,
      FileSystemModule.self,
      KeepAwakeModule.self,
      ExpoSystemUIModule.self,
      UpdatesModule.self
    ]
  }

  public override func getAppDelegateSubscribers() -> [ExpoAppDelegateSubscriber.Type] {
    return [
      FileSystemBackgroundSessionHandler.self
    ]
  }

  public override func getReactDelegateHandlers() -> [ExpoReactDelegateHandlerTupleType] {
    return [
      (packageName: "expo-updates", handler: ExpoUpdatesReactDelegateHandler.self)
    ]
  }
}
