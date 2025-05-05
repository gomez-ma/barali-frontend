import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/auth/auth.service';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!email) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    if (!password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
    // ส่งข้อมูลไปยัง backend หรือทำการ login
    // console.log('เข้าสู่ระบบด้วย', { email, password });
    try {
        const user = AuthService.login(email, password);
        if(user) {
            // window.location.reload();
            alert("Login Successfully");
            navigate("/", { replace: true })
        }
    } catch (error) {
        setErrors(error.respose.data?.message);
    }

    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">เข้าสู่ระบบ</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">อีเมล</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">รหัสผ่าน</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
};

export default LoginPage;
