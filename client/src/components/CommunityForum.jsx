import { useState } from 'react';
import { MessageSquare, ThumbsUp, Reply, Send, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
export function CommunityForum() {
    var posts = useState([
        {
            id: '1',
            author: 'Priya Sharma',
            avatar: '👩',
            title: 'How to improve pronunciation?',
            content: 'I struggle with "th" sounds. Any tips?',
            likes: 12,
            replies: 5,
            timestamp: '2 hours ago',
            category: 'Pronunciation'
        },
        {
            id: '2',
            author: 'Raj Kumar',
            avatar: '👨',
            title: 'Completed 100 lessons! 🎉',
            content: 'Just hit my 100 lesson milestone. This app is amazing!',
            likes: 45,
            replies: 12,
            timestamp: '5 hours ago',
            category: 'Achievements'
        },
        {
            id: '3',
            author: 'Anita Patel',
            avatar: '👩‍🦱',
            title: 'Study group for beginners?',
            content: 'Anyone interested in forming a study group?',
            likes: 8,
            replies: 3,
            timestamp: '1 day ago',
            category: 'Study Groups'
        }
    ])[0];
    var _a = useState(''), newPost = _a[0], setNewPost = _a[1];
    var _b = useState(false), showNewPost = _b[0], setShowNewPost = _b[1];
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            समुदाय मंच (Community Forum)
          </h2>
          <p className="text-muted-foreground mt-1">
            Connect with fellow learners
          </p>
        </div>
        <Button onClick={function () { return setShowNewPost(!showNewPost); }}>
          <MessageSquare className="w-4 h-4 mr-2"/>
          New Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600"/>
              <div>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-green-600"/>
              <div>
                <p className="text-2xl font-bold">567</p>
                <p className="text-sm text-muted-foreground">Discussions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600"/>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Posts Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Post Form */}
      {showNewPost && (<Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input type="text" placeholder="Post title..." className="w-full px-4 py-2 border rounded-lg"/>
            <Textarea placeholder="Share your thoughts, questions, or achievements..." value={newPost} onChange={function (e) { return setNewPost(e.target.value); }} rows={4}/>
            <div className="flex gap-2">
              <Button>
                <Send className="w-4 h-4 mr-2"/>
                Post
              </Button>
              <Button variant="outline" onClick={function () { return setShowNewPost(false); }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>)}

      {/* Posts */}
      <div className="space-y-4">
        {posts.map(function (post) { return (<Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                {/* Avatar */}
                <Avatar className="w-12 h-12 text-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
                  {post.avatar}
                </Avatar>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {post.author} • {post.timestamp}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <p className="mt-2 text-slate-700 dark:text-slate-300">
                    {post.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-4">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-4 h-4 mr-1"/>
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Reply className="w-4 h-4 mr-1"/>
                      {post.replies} Replies
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>); })}
      </div>
    </div>);
}
