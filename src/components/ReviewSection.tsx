import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Star, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user: {
    name?: string;
  };
}

interface ReviewSectionProps {
  jobId: string;
  jobTitle: string;
  company: string;
}

export default function ReviewSection({ jobId, jobTitle, company }: ReviewSectionProps) {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userReview, setUserReview] = useState({
    rating: 0,
    comment: '',
  });
  const [message, setMessage] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [jobId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?jobId=${jobId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setMessage('Silakan login untuk memberikan review');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          rating: userReview.rating,
          comment: userReview.comment,
        }),
      });

      if (response.ok) {
        setMessage('Review submitted successfully!');
        setUserReview({ rating: 0, comment: '' });
        setShowReviewForm(false);
        await fetchReviews();
      } else {
        const error = await response.json();
        setMessage(error.error || 'Failed to submit review');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2 text-gray-600">Memuat review...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card className="border-0 shadow-xl bg-white rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Review & Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>
                {renderStars(Math.round(averageRating))}
                <div className="text-sm text-gray-600 mt-1">
                  {totalReviews} review
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">{jobTitle}</h3>
                <p className="text-gray-600">{company}</p>
              </div>
            </div>
            
            {isAuthenticated && (
              <Button
                onClick={() => setShowReviewForm(!showReviewForm)}
                variant="outline"
              >
                {showReviewForm ? 'Batal' : 'Tulis Review'}
              </Button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label>Rating</Label>
                {renderStars(userReview.rating, true, (rating) => 
                  setUserReview({ ...userReview, rating })
                )}
              </div>
              <div>
                <Label htmlFor="comment">Review</Label>
                <Textarea
                  id="comment"
                  value={userReview.comment}
                  onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                  placeholder="Bagikan pengalaman Anda dengan lowongan ini..."
                  rows={3}
                  className="mt-1"
                />
              </div>
              {message && (
                <Alert className={message.includes('success') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                disabled={userReview.rating === 0 || submitting}
                className="bg-gray-900 hover:bg-gray-800"
              >
                {submitting ? 'Mengirim...' : 'Kirim Review'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      {reviews.length > 0 && (
        <Card className="border-0 shadow-xl bg-white rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">
              Semua Review ({totalReviews})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {review.user?.name || 'Anonymous'}
                        </span>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!isAuthenticated && (
        <Alert>
          <MessageSquare className="h-4 w-4" />
          <AlertDescription>
            <Link href="/profile" className="text-blue-600 hover:underline">
              Login
            </Link>{' '}
            untuk memberikan review
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}