import { useCallback, useEffect, useState } from "react";
import { IS_ONLINE, addComment, deleteComment, listComments } from "../services/feedbackApi";

function timeAgo(iso) {
  const s = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} day${d === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString();
}

export default function Feedback() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    try {
      setComments((await listComments()) || []);
      setError("");
    } catch {
      setError("Could not load comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // first load right away, then refresh to pick up new comments from other visitors
    const first = setTimeout(load, 0);
    const t = setInterval(load, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, [load]);

  const submit = async (e) => {
    e.preventDefault();
    const n = name.trim();
    const m = message.trim();
    if (!n || !m || sending) return;
    setSending(true);
    try {
      await addComment(n, m);
      setMessage("");
      await load();
    } catch {
      setError("Could not post your comment. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete your comment?")) return;
    try {
      await deleteComment(id);
      await load();
    } catch {
      setError("Could not delete the comment. Please try again.");
    }
  };

  return (
    <section className="feedback" aria-labelledby="fb-title">
      <h2 id="fb-title">💬 Feedback &amp; Suggestions</h2>
      <p className="fb-sub">
        Tell us what you like or what we should add. Everyone can read and post, and only you can
        delete your own comment.
      </p>

      {!IS_ONLINE && (
        <p className="fb-demo">
          Demo mode: comments are saved only in this browser. Connect the database (see README) to
          share them with all visitors.
        </p>
      )}

      <form className="fb-form" onSubmit={submit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={40}
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback or suggestion..."
          maxLength={500}
          rows={3}
          required
        />
        <div className="fb-row">
          <span className="fb-count">{message.length}/500</span>
          <button className="btn" type="submit" disabled={sending}>
            {sending ? "Posting..." : "Post comment"}
          </button>
        </div>
      </form>

      {error && <p className="fb-error" role="alert">{error}</p>}

      <div className="fb-list">
        {loading && <p className="fb-empty">Loading comments...</p>}
        {!loading && comments.length === 0 && (
          <p className="fb-empty">No comments yet. Be the first to share a suggestion!</p>
        )}
        {comments.map((c) => (
          <article className="fb-item" key={c.id}>
            <div className="fb-avatar" aria-hidden="true">{c.name.charAt(0).toUpperCase()}</div>
            <div className="fb-content">
              <div className="fb-head">
                <strong>{c.name}</strong>
                {c.mine && <span className="fb-you">You</span>}
                <span className="fb-time">{timeAgo(c.created_at)}</span>
              </div>
              <p>{c.message}</p>
            </div>
            {c.mine && (
              <button className="fb-del" onClick={() => remove(c.id)} aria-label="Delete your comment">
                🗑 Delete
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
