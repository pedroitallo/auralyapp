import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setMessage({
        type: "success",
        text: "✓ Password changed successfully! You can now close this page and login."
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setMessage({
        type: "error",
        text: `✗ Error: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      margin: 0,
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      background: 'linear-gradient(135deg, #f5f3f7 0%, #e9e5f0 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '440px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(123, 44, 191, 0.15)',
        border: '1px solid rgba(123, 44, 191, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
          <h1 style={{
            color: '#1a1a2e',
            fontSize: '28px',
            fontWeight: 600,
            letterSpacing: '-0.5px',
            marginBottom: '12px'
          }}>Reset Your Password</h1>
          <p style={{
            color: '#4a4a6a',
            fontSize: '15px',
            lineHeight: '22px'
          }}>Enter a new password for your Auraly account</p>
        </div>

        <form onSubmit={handleResetPassword} style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="new-password" style={{
              display: 'block',
              color: '#7b2cbf',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '8px'
            }}>New Password</label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter your new password"
              minLength="6"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#f5f3f7',
                border: '2px solid rgba(123, 44, 191, 0.2)',
                borderRadius: '12px',
                color: '#1a1a2e',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #7b2cbf 0%, #5a189a 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(123, 44, 191, 0.25)',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {message.text && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 500,
            textAlign: 'center',
            background: message.type === 'success'
              ? 'rgba(5, 150, 105, 0.1)'
              : 'rgba(220, 38, 38, 0.1)',
            border: message.type === 'success'
              ? '1px solid rgba(5, 150, 105, 0.3)'
              : '1px solid rgba(220, 38, 38, 0.3)',
            color: message.type === 'success' ? '#059669' : '#dc2626'
          }}>
            {message.text}
          </div>
        )}

        <div style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(123, 44, 191, 0.15)',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '13px'
        }}>
          ©️ 2025 Auraly. Your spiritual journey.
        </div>
      </div>
    </div>
  );
}
