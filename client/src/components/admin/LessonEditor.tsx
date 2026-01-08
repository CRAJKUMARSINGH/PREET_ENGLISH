import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle, Save, X } from 'lucide-react';

interface LessonEditorProps {
  lesson?: any;
  onSave: (lesson: any) => void;
  onCancel: () => void;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export function LessonEditor({ lesson, onSave, onCancel }: LessonEditorProps) {
  const [formData, setFormData] = useState(lesson || {
    title: '',
    slug: '',
    description: '',
    content: '',
    difficulty: 'Beginner',
    order: 1,
    imageUrl: ''
  });
  
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !lesson?.id) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData((prev: any) => ({ ...prev, slug }));
    }
  }, [formData.title, lesson?.id]);

  const handleValidate = async () => {
    setValidating(true);
    try {
      const response = await fetch('/api/admin/lessons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setValidation(result);
    } catch (err) {
      console.error('Validation error:', err);
      setValidation({
        valid: false,
        errors: ['Validation failed. Please try again.'],
        warnings: [],
        suggestions: []
      });
    } finally {
      setValidating(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const method = lesson?.id ? 'PUT' : 'POST';
      const url = lesson?.id
        ? `/api/admin/lessons/${lesson.id}`
        : '/api/admin/lessons';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Save failed');
      }

      const saved = await response.json();
      onSave(saved);
    } catch (err: any) {
      console.error('Save error:', err);
      setValidation({
        valid: false,
        errors: [err.message || 'Save failed. Please try again.'],
        warnings: [],
        suggestions: []
      });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    // Clear validation when user makes changes
    if (validation) {
      setValidation(null);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {lesson?.id ? 'Edit Lesson' : 'Create New Lesson'}
          {validation?.valid && (
            <Badge variant="secondary" className="text-green-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              Valid
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Validation Results */}
        {validation && (
          <div className="space-y-2">
            {validation.errors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1">
                    {validation.errors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {validation.warnings.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1">
                    {validation.warnings.map((warning, i) => (
                      <li key={i}>{warning}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {validation.suggestions.length > 0 && (
              <Alert>
                <AlertDescription>
                  <strong>Suggestions:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {validation.suggestions.map((suggestion, i) => (
                      <li key={i}>{suggestion}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter lesson title"
              className={validation?.errors.some(e => e.includes('Title')) ? 'border-red-500' : ''}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Slug *</label>
            <Input
              value={formData.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              placeholder="lesson-slug"
              className={validation?.errors.some(e => e.includes('Slug')) ? 'border-red-500' : ''}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description *</label>
          <Textarea
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Brief description of the lesson"
            rows={2}
            className={validation?.errors.some(e => e.includes('Description')) ? 'border-red-500' : ''}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content * (Markdown supported)</label>
          <Textarea
            value={formData.content}
            onChange={(e) => updateField('content', e.target.value)}
            placeholder="# Lesson Title&#10;&#10;Write your lesson content here using markdown...&#10;&#10;## Section 1&#10;Content here..."
            rows={12}
            className={`font-mono text-sm ${validation?.errors.some(e => e.includes('Content')) ? 'border-red-500' : ''}`}
          />
          <p className="text-xs text-gray-500">
            Use markdown formatting: # for headers, **bold**, *italic*, - for lists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty *</label>
            <select
              value={formData.difficulty}
              onChange={(e) => updateField('difficulty', e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Order</label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => updateField('order', parseInt(e.target.value) || 1)}
              min="1"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL (optional)</label>
            <Input
              value={formData.imageUrl}
              onChange={(e) => updateField('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Preview */}
        {formData.imageUrl && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Image Preview</label>
            <img
              src={formData.imageUrl}
              alt="Lesson preview"
              className="w-full max-w-md h-48 object-cover rounded-md border"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={handleValidate}
            variant="outline"
            disabled={validating || loading}
          >
            {validating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Validate
              </>
            )}
          </Button>

          <Button
            onClick={handleSave}
            disabled={loading || validating || (validation ? !validation.valid : false)}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {lesson?.id ? 'Update Lesson' : 'Create Lesson'}
              </>
            )}
          </Button>

          <Button onClick={onCancel} variant="ghost">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}