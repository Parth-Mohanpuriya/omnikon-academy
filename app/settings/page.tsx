"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Palette,
  Shield,
  AlertTriangle,
  Save,
  Mail,
  BookOpen,
  Activity,
  Eye,
  EyeOff,
  Type,
  Trash2,
  Download
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockUserSettings, UserSettings } from "@/lib/mock-data";

type TabId = "account" | "notifications" | "appearance" | "privacy" | "danger";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "account", label: "ACCOUNT", icon: <User className="h-4 w-4" /> },
  { id: "notifications", label: "NOTIFICATIONS", icon: <Bell className="h-4 w-4" /> },
  { id: "appearance", label: "APPEARANCE", icon: <Palette className="h-4 w-4" /> },
  { id: "privacy", label: "PRIVACY", icon: <Shield className="h-4 w-4" /> },
  { id: "danger", label: "DANGER_ZONE", icon: <AlertTriangle className="h-4 w-4" /> }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("account");
  const [settings, setSettings] = useState<UserSettings>(mockUserSettings);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = () => {
    showNotification("Settings saved successfully");
  };

  const ToggleSwitch = ({
    enabled,
    onChange
  }: {
    enabled: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        enabled ? "bg-red-500" : "bg-zinc-700"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen text-zinc-300 relative flex flex-col justify-between selection:bg-red-500 selection:text-white">
      <div className="grid-bg absolute inset-0" />
      <div className="grid-bg-glow" />

      <div>
        <Navbar />

        <main className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Notification */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-20 right-4 z-50 rounded-lg border border-emerald-500/30 bg-[#061009] p-4 text-xs text-emerald-400 font-mono shadow-2xl"
              >
                {notification}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1 font-mono text-[10px] text-red-400 mb-4">
              <span>&gt; SYSTEM_CONFIG</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white font-mono">
              Settings
            </h1>
            <p className="text-zinc-400 text-sm mt-2">
              Manage your account preferences and system configuration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Tabs Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="rounded-xl border border-white/5 bg-[#070709] p-2 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === tab.id
                        ? "bg-red-500/10 border border-red-500/30 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-9"
            >
              <div className="rounded-xl border border-white/5 bg-[#070709] p-6">
                {/* Account Tab */}
                {activeTab === "account" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/5 pb-4">
                      <h2 className="text-sm font-mono text-white font-bold flex items-center gap-2">
                        <User className="h-4 w-4 text-red-500" />
                        ACCOUNT_SETTINGS
                      </h2>
                      <p className="text-xs text-zinc-500 mt-1">
                        Manage your personal information and account details.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-2">
                          DISPLAY_NAME
                        </label>
                        <input
                          type="text"
                          value={settings.displayName}
                          onChange={(e) =>
                            setSettings({ ...settings, displayName: e.target.value })
                          }
                          className="w-full rounded-lg border border-white/10 bg-[#0c0c0e] px-4 py-2.5 text-sm text-white focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-2">
                          EMAIL
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="email"
                            value="alex.rivera@omnikon.dev"
                            disabled
                            className="flex-1 rounded-lg border border-white/10 bg-[#0a0a0c] px-4 py-2.5 text-sm text-zinc-500 font-mono cursor-not-allowed"
                          />
                          <span className="text-[10px] font-mono text-zinc-600">
                            VERIFIED
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-2">
                          BIO
                        </label>
                        <textarea
                          value={settings.bio}
                          onChange={(e) =>
                            setSettings({ ...settings, bio: e.target.value })
                          }
                          rows={3}
                          className="w-full rounded-lg border border-white/10 bg-[#0c0c0e] px-4 py-2.5 text-sm text-white focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 font-mono resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-mono text-xs font-bold hover:bg-red-400 transition-colors"
                      >
                        <Save className="h-3 w-3" />
                        SAVE_CHANGES
                      </button>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/5 pb-4">
                      <h2 className="text-sm font-mono text-white font-bold flex items-center gap-2">
                        <Bell className="h-4 w-4 text-red-500" />
                        NOTIFICATION_PREFERENCES
                      </h2>
                      <p className="text-xs text-zinc-500 mt-1">
                        Control how and when you receive notifications.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-[#0a0a0c]">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-zinc-500" />
                          <div>
                            <p className="text-xs font-mono text-white">
                              Email Notifications
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              Receive updates via email
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={settings.emailNotifications}
                          onChange={() =>
                            setSettings({
                              ...settings,
                              emailNotifications: !settings.emailNotifications
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-[#0a0a0c]">
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-4 w-4 text-zinc-500" />
                          <div>
                            <p className="text-xs font-mono text-white">
                              Course Updates
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              New lessons and course announcements
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={settings.courseUpdates}
                          onChange={() =>
                            setSettings({
                              ...settings,
                              courseUpdates: !settings.courseUpdates
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-[#0a0a0c]">
                        <div className="flex items-center gap-3">
                          <Activity className="h-4 w-4 text-zinc-500" />
                          <div>
                            <p className="text-xs font-mono text-white">
                              Activity Alerts
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              Community activity and mentions
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={settings.activityAlerts}
                          onChange={() =>
                            setSettings({
                              ...settings,
                              activityAlerts: !settings.activityAlerts
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-[#0a0a0c]">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-zinc-500" />
                          <div>
                            <p className="text-xs font-mono text-white">
                              Newsletter
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              Weekly digest of courses and community highlights
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={settings.newsletter}
                          onChange={() =>
                            setSettings({
                              ...settings,
                              newsletter: !settings.newsletter
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-mono text-xs font-bold hover:bg-red-400 transition-colors"
                      >
                        <Save className="h-3 w-3" />
                        SAVE_PREFERENCES
                      </button>
                    </div>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/5 pb-4">
                      <h2 className="text-sm font-mono text-white font-bold flex items-center gap-2">
                        <Palette className="h-4 w-4 text-red-500" />
                        APPEARANCE_SETTINGS
                      </h2>
                      <p className="text-xs text-zinc-500 mt-1">
                        Customize the look and feel of your interface.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-3">
                          THEME
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {["Dark", "Light", "System"].map((theme) => (
                            <button
                              key={theme}
                              className={`p-4 rounded-lg border text-center font-mono text-xs transition-all ${
                                theme === "Dark"
                                  ? "border-red-500 bg-red-500/10 text-white"
                                  : "border-white/5 bg-[#0a0a0c] text-zinc-500 hover:border-white/20"
                              }`}
                            >
                              <div
                                className={`h-8 w-8 rounded mx-auto mb-2 ${
                                  theme === "Dark"
                                    ? "bg-zinc-900 border border-zinc-700"
                                    : theme === "Light"
                                    ? "bg-white border border-zinc-200"
                                    : "bg-gradient-to-r from-zinc-900 to-white border border-zinc-500"
                                }`}
                              />
                              {theme}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-3">
                          FONT_SIZE
                        </label>
                        <div className="flex gap-3">
                          {(["small", "medium", "large"] as const).map((size) => (
                            <button
                              key={size}
                              onClick={() =>
                                setSettings({ ...settings, fontSize: size })
                              }
                              className={`flex-1 py-3 rounded-lg border text-center font-mono text-xs transition-all ${
                                settings.fontSize === size
                                  ? "border-red-500 bg-red-500/10 text-white"
                                  : "border-white/5 bg-[#0a0a0c] text-zinc-500 hover:border-white/20"
                              }`}
                            >
                              <Type
                                className={`mx-auto mb-1 ${
                                  size === "small"
                                    ? "h-3 w-3"
                                    : size === "medium"
                                    ? "h-4 w-4"
                                    : "h-5 w-5"
                                }`}
                              />
                              {size.charAt(0).toUpperCase() + size.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-mono text-xs font-bold hover:bg-red-400 transition-colors"
                      >
                        <Save className="h-3 w-3" />
                        SAVE_APPEARANCE
                      </button>
                    </div>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === "privacy" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/5 pb-4">
                      <h2 className="text-sm font-mono text-white font-bold flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-500" />
                        PRIVACY_SETTINGS
                      </h2>
                      <p className="text-xs text-zinc-500 mt-1">
                        Control your visibility and data sharing preferences.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-[#0a0a0c]">
                        <div className="flex items-center gap-3">
                          {settings.profileVisibility ? (
                            <Eye className="h-4 w-4 text-zinc-500" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-zinc-500" />
                          )}
                          <div>
                            <p className="text-xs font-mono text-white">
                              Profile Visibility
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              Make your profile visible to other users
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={settings.profileVisibility}
                          onChange={() =>
                            setSettings({
                              ...settings,
                              profileVisibility: !settings.profileVisibility
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-[#0a0a0c]">
                        <div className="flex items-center gap-3">
                          <Activity className="h-4 w-4 text-zinc-500" />
                          <div>
                            <p className="text-xs font-mono text-white">
                              Show Activity Status
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              Display when you are active on the platform
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={settings.showActivityStatus}
                          onChange={() =>
                            setSettings({
                              ...settings,
                              showActivityStatus: !settings.showActivityStatus
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-mono text-xs font-bold hover:bg-red-400 transition-colors"
                      >
                        <Save className="h-3 w-3" />
                        SAVE_PRIVACY
                      </button>
                    </div>
                  </div>
                )}

                {/* Danger Zone Tab */}
                {activeTab === "danger" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/5 pb-4">
                      <h2 className="text-sm font-mono text-white font-bold flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        DANGER_ZONE
                      </h2>
                      <p className="text-xs text-zinc-500 mt-1">
                        Irreversible actions. Proceed with caution.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-white/5 bg-[#0a0a0c]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Download className="h-4 w-4 text-zinc-500" />
                            <div>
                              <p className="text-xs font-mono text-white">
                                Export Data
                              </p>
                              <p className="text-[10px] text-zinc-500">
                                Download all your data including progress and certificates
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => showNotification("Export started. Check your email.")}
                            className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#0e0e11] text-zinc-300 font-mono text-xs hover:bg-white/5 transition-colors"
                          >
                            EXPORT
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <div>
                              <p className="text-xs font-mono text-white">
                                Delete Account
                              </p>
                              <p className="text-[10px] text-zinc-500">
                                Permanently delete your account and all associated data
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500 text-red-400 font-mono text-xs hover:bg-red-500/20 transition-colors"
                          >
                            DELETE_ACCOUNT
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete Confirmation Modal */}
                    <AnimatePresence>
                      {showDeleteConfirm && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                        >
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="rounded-xl border border-red-500/30 bg-[#0a0a0c] p-6 max-w-md mx-4"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                              </div>
                              <div>
                                <h3 className="text-sm font-mono text-white font-bold">
                                  Confirm Deletion
                                </h3>
                                <p className="text-[10px] text-zinc-500">
                                  This action cannot be undone
                                </p>
                              </div>
                            </div>

                            <p className="text-xs text-zinc-400 mb-6">
                              Are you sure you want to delete your account? All your
                              progress, certificates, and data will be permanently
                              removed.
                            </p>

                            <div className="flex gap-3 justify-end">
                              <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 rounded-lg border border-white/10 bg-[#0e0e11] text-zinc-300 font-mono text-xs hover:bg-white/5 transition-colors"
                              >
                                CANCEL
                              </button>
                              <button
                                onClick={() => {
                                  setShowDeleteConfirm(false);
                                  showNotification(
                                    "Account deletion request submitted."
                                  );
                                }}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white font-mono text-xs font-bold hover:bg-red-400 transition-colors"
                              >
                                DELETE_PERMANENTLY
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
