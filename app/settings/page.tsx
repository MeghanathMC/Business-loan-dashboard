'use client';

import { useState } from 'react';
import { useSettings, useCurrency, useUser } from '@/lib/settings-context';
import { AVAILABLE_CURRENCIES, AVAILABLE_ROLES } from '@/lib/settings-types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Settings, 
  User, 
  DollarSign, 
  Bell, 
  Palette,
  Save,
  RotateCcw
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { state, updateUser, updateSettings, setCurrency, resetSettings } = useSettings();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been successfully saved.',
      });
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Failed to save your settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSettings = () => {
    resetSettings();
    toast({
      title: 'Settings Reset',
      description: 'All settings have been reset to default values.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Settings className="h-8 w-8" />
                  Settings
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your profile and application preferences
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Profile Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={state.user.name}
                    onChange={(e) => updateUser({ name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={state.user.email}
                    onChange={(e) => updateUser({ email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={state.user.phone || ''}
                    onChange={(e) => updateUser({ phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={state.user.role}
                    onValueChange={(value: any) => updateUser({ role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_ROLES.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={state.user.department || ''}
                    onChange={(e) => updateUser({ department: e.target.value })}
                    placeholder="Enter your department"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Profile
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Currency Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Currency Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select
                    value={state.settings.currency.code}
                    onValueChange={(value) => {
                      const currency = AVAILABLE_CURRENCIES.find(c => c.code === value);
                      if (currency) setCurrency(currency);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono">{currency.symbol}</span>
                            <span>{currency.name}</span>
                            <span className="text-muted-foreground">({currency.code})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Currency Preview</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sample Amount:</span>
                      <span className="font-mono">
                        {new Intl.NumberFormat(state.settings.currency.locale, {
                          style: 'currency',
                          currency: state.settings.currency.code,
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(1250000)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>With Decimals:</span>
                      <span className="font-mono">
                        {new Intl.NumberFormat(state.settings.currency.locale, {
                          style: 'currency',
                          currency: state.settings.currency.code,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(1250000.50)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={state.settings.notifications.email}
                    onCheckedChange={(checked) =>
                      updateSettings({
                        notifications: { ...state.settings.notifications, email: checked }
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in browser
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={state.settings.notifications.push}
                    onCheckedChange={(checked) =>
                      updateSettings({
                        notifications: { ...state.settings.notifications, push: checked }
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={state.settings.notifications.sms}
                    onCheckedChange={(checked) =>
                      updateSettings({
                        notifications: { ...state.settings.notifications, sms: checked }
                      })
                    }
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current User Info */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Current Profile</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{state.user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <Badge variant="outline">
                    {AVAILABLE_ROLES.find(r => r.value === state.user.role)?.label}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{state.user.department || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Currency</p>
                  <p className="font-medium">
                    {state.settings.currency.symbol} {state.settings.currency.name}
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={isSaving}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save All Settings
                </Button>
                <Button 
                  onClick={handleResetSettings}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
