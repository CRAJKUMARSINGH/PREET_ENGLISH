var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { LessonEditor } from '@/components/admin/LessonEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Plus, Edit, Trash2, Download, Users, BarChart3, Settings, Shield, AlertTriangle } from 'lucide-react';
export default function Admin() {
    var _this = this;
    var _a = useUser(), user = _a.user, userLoading = _a.loading;
    var _b = useState([]), lessons = _b[0], setLessons = _b[1];
    var _c = useState(null), selectedLesson = _c[0], setSelectedLesson = _c[1];
    var _d = useState(false), showEditor = _d[0], setShowEditor = _d[1];
    var _e = useState(true), loading = _e[0], setLoading = _e[1];
    var _f = useState('dashboard'), activeTab = _f[0], setActiveTab = _f[1];
    useEffect(function () {
        if (!userLoading && user) {
            fetchLessons();
        }
    }, [user, userLoading]);
    var fetchLessons = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/admin/lessons')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setLessons(data);
                    _a.label = 3;
                case 3: return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error('Error fetching lessons:', err_1);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleSaveLesson = function (lesson) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchLessons()];
                case 1:
                    _a.sent(); // Refresh the list
                    setShowEditor(false);
                    setSelectedLesson(null);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleEditLesson = function (lesson) {
        setSelectedLesson(lesson);
        setShowEditor(true);
    };
    var handleDeleteLesson = function (lessonId) { return __awaiter(_this, void 0, void 0, function () {
        var response, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are you sure you want to delete this lesson?'))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch("/api/admin/lessons/".concat(lessonId), {
                            method: 'DELETE',
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetchLessons()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_2 = _a.sent();
                    console.error('Error deleting lesson:', err_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleExportLessons = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, blob, url, a, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/admin/lessons/export')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.blob()];
                case 2:
                    blob = _a.sent();
                    url = window.URL.createObjectURL(blob);
                    a = document.createElement('a');
                    a.href = url;
                    a.download = 'lessons-export.json';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_3 = _a.sent();
                    console.error('Error exporting lessons:', err_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Loading state
    if (userLoading || loading) {
        return (<div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>);
    }
    // Access control
    if (!user) {
        return (<div className="flex items-center justify-center min-h-screen">
        <Alert className="max-w-md">
          <Shield className="h-4 w-4"/>
          <AlertDescription>
            Please log in to access the admin panel.
          </AlertDescription>
        </Alert>
      </div>);
    }
    if (!user.isAdmin) {
        return (<div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4"/>
          <AlertDescription>
            You don't have permission to access the admin panel.
          </AlertDescription>
        </Alert>
      </div>);
    }
    // Show lesson editor
    if (showEditor) {
        return (<div className="container mx-auto py-8">
        <LessonEditor lesson={selectedLesson} onSave={handleSaveLesson} onCancel={function () {
                setShowEditor(false);
                setSelectedLesson(null);
            }}/>
      </div>);
    }
    return (<div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage your English learning platform
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4"/>
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4"/>
            Lessons
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4"/>
            Users
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4"/>
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="lessons" className="mt-6">
          <div className="space-y-6">
            {/* Lesson Management Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Lesson Management</h2>
              <div className="flex gap-2">
                <Button onClick={handleExportLessons} variant="outline">
                  <Download className="w-4 h-4 mr-2"/>
                  Export
                </Button>
                <Button onClick={function () { return setShowEditor(true); }}>
                  <Plus className="w-4 h-4 mr-2"/>
                  Create Lesson
                </Button>
              </div>
            </div>

            {/* Lessons List */}
            <div className="grid gap-4">
              {lessons.map(function (lesson) { return (<Card key={lesson.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {lesson.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{lesson.difficulty}</Badge>
                        <Badge variant="outline">Order: {lesson.order}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Slug: {lesson.slug} • Created: {new Date(lesson.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={function () { return handleEditLesson(lesson); }}>
                          <Edit className="w-4 h-4 mr-1"/>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={function () { return handleDeleteLesson(lesson.id); }}>
                          <Trash2 className="w-4 h-4 mr-1"/>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>); })}

              {lessons.length === 0 && (<Card>
                  <CardContent className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4"/>
                    <h3 className="text-lg font-semibold mb-2">No lessons found</h3>
                    <p className="text-muted-foreground mb-4">
                      Get started by creating your first lesson.
                    </p>
                    <Button onClick={function () { return setShowEditor(true); }}>
                      <Plus className="w-4 h-4 mr-2"/>
                      Create First Lesson
                    </Button>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                User management features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                System settings and configuration options coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);
}
