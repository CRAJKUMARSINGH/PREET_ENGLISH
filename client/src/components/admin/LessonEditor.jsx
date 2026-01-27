var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle, Save, X } from 'lucide-react';
export function LessonEditor(_a) {
    var _this = this;
    var lesson = _a.lesson, onSave = _a.onSave, onCancel = _a.onCancel;
    var _b = useState(lesson || {
        title: '',
        slug: '',
        description: '',
        content: '',
        difficulty: 'Beginner',
        order: 1,
        imageUrl: ''
    }), formData = _b[0], setFormData = _b[1];
    var _c = useState(null), validation = _c[0], setValidation = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var _e = useState(false), validating = _e[0], setValidating = _e[1];
    // Auto-generate slug from title
    useEffect(function () {
        if (formData.title && !(lesson === null || lesson === void 0 ? void 0 : lesson.id)) {
            var slug_1 = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            setFormData(function (prev) { return (__assign(__assign({}, prev), { slug: slug_1 })); });
        }
    }, [formData.title, lesson === null || lesson === void 0 ? void 0 : lesson.id]);
    var handleValidate = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setValidating(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/admin/lessons/validate', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    setValidation(result);
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error('Validation error:', err_1);
                    setValidation({
                        valid: false,
                        errors: ['Validation failed. Please try again.'],
                        warnings: [],
                        suggestions: []
                    });
                    return [3 /*break*/, 6];
                case 5:
                    setValidating(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var method, url, response, error, saved, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    method = (lesson === null || lesson === void 0 ? void 0 : lesson.id) ? 'PUT' : 'POST';
                    url = (lesson === null || lesson === void 0 ? void 0 : lesson.id)
                        ? "/api/admin/lessons/".concat(lesson.id)
                        : '/api/admin/lessons';
                    return [4 /*yield*/, fetch(url, {
                            method: method,
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData),
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    error = _a.sent();
                    throw new Error(error.message || 'Save failed');
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    saved = _a.sent();
                    onSave(saved);
                    return [3 /*break*/, 8];
                case 6:
                    err_2 = _a.sent();
                    console.error('Save error:', err_2);
                    setValidation({
                        valid: false,
                        errors: [err_2.message || 'Save failed. Please try again.'],
                        warnings: [],
                        suggestions: []
                    });
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var updateField = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
        // Clear validation when user makes changes
        if (validation) {
            setValidation(null);
        }
    };
    return (<Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {(lesson === null || lesson === void 0 ? void 0 : lesson.id) ? 'Edit Lesson' : 'Create New Lesson'}
          {(validation === null || validation === void 0 ? void 0 : validation.valid) && (<Badge variant="secondary" className="text-green-600">
              <CheckCircle className="w-3 h-3 mr-1"/>
              Valid
            </Badge>)}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Validation Results */}
        {validation && (<div className="space-y-2">
            {validation.errors.length > 0 && (<Alert variant="destructive">
                <AlertCircle className="h-4 w-4"/>
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1">
                    {validation.errors.map(function (error, i) { return (<li key={i}>{error}</li>); })}
                  </ul>
                </AlertDescription>
              </Alert>)}

            {validation.warnings.length > 0 && (<Alert>
                <AlertCircle className="h-4 w-4"/>
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1">
                    {validation.warnings.map(function (warning, i) { return (<li key={i}>{warning}</li>); })}
                  </ul>
                </AlertDescription>
              </Alert>)}

            {validation.suggestions.length > 0 && (<Alert>
                <AlertDescription>
                  <strong>Suggestions:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {validation.suggestions.map(function (suggestion, i) { return (<li key={i}>{suggestion}</li>); })}
                  </ul>
                </AlertDescription>
              </Alert>)}
          </div>)}

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title *</label>
            <Input value={formData.title} onChange={function (e) { return updateField('title', e.target.value); }} placeholder="Enter lesson title" className={(validation === null || validation === void 0 ? void 0 : validation.errors.some(function (e) { return e.includes('Title'); })) ? 'border-red-500' : ''}/>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Slug *</label>
            <Input value={formData.slug} onChange={function (e) { return updateField('slug', e.target.value); }} placeholder="lesson-slug" className={(validation === null || validation === void 0 ? void 0 : validation.errors.some(function (e) { return e.includes('Slug'); })) ? 'border-red-500' : ''}/>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description *</label>
          <Textarea value={formData.description} onChange={function (e) { return updateField('description', e.target.value); }} placeholder="Brief description of the lesson" rows={2} className={(validation === null || validation === void 0 ? void 0 : validation.errors.some(function (e) { return e.includes('Description'); })) ? 'border-red-500' : ''}/>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content * (Markdown supported)</label>
          <Textarea value={formData.content} onChange={function (e) { return updateField('content', e.target.value); }} placeholder="# Lesson Title&#10;&#10;Write your lesson content here using markdown...&#10;&#10;## Section 1&#10;Content here..." rows={12} className={"font-mono text-sm ".concat((validation === null || validation === void 0 ? void 0 : validation.errors.some(function (e) { return e.includes('Content'); })) ? 'border-red-500' : '')}/>
          <p className="text-xs text-gray-500">
            Use markdown formatting: # for headers, **bold**, *italic*, - for lists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty *</label>
            <select value={formData.difficulty} onChange={function (e) { return updateField('difficulty', e.target.value); }} className="w-full p-2 border rounded-md">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Order</label>
            <Input type="number" value={formData.order} onChange={function (e) { return updateField('order', parseInt(e.target.value) || 1); }} min="1"/>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL (optional)</label>
            <Input value={formData.imageUrl} onChange={function (e) { return updateField('imageUrl', e.target.value); }} placeholder="https://example.com/image.jpg"/>
          </div>
        </div>

        {/* Preview */}
        {formData.imageUrl && (<div className="space-y-2">
            <label className="text-sm font-medium">Image Preview</label>
            <img src={formData.imageUrl} alt="Lesson preview" className="w-full max-w-md h-48 object-cover rounded-md border" onError={function (e) {
                e.target.style.display = 'none';
            }}/>
          </div>)}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={handleValidate} variant="outline" disabled={validating || loading}>
            {validating ? (<>
                <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                Validating...
              </>) : (<>
                <CheckCircle className="w-4 h-4 mr-2"/>
                Validate
              </>)}
          </Button>

          <Button onClick={handleSave} disabled={loading || validating || (validation ? !validation.valid : false)}>
            {loading ? (<>
                <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                Saving...
              </>) : (<>
                <Save className="w-4 h-4 mr-2"/>
                {(lesson === null || lesson === void 0 ? void 0 : lesson.id) ? 'Update Lesson' : 'Create Lesson'}
              </>)}
          </Button>

          <Button onClick={onCancel} variant="ghost">
            <X className="w-4 h-4 mr-2"/>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>);
}
