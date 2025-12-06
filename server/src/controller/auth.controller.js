const {
  RegisterService,
  LoginService,
  VerifyEmailService,
  ForgotPasswordService,
  ResetPasswordService,
  RefreshTokenService,
  GetProfileService,
  UpdateProfileService,
  ChangePasswordService,
  GetAllUsersService,
} = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const result = await RegisterService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await LoginService(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const result = await VerifyEmailService(req.params.token);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const result = await ForgotPasswordService(req.body.email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const result = await ResetPasswordService(
      req.params.token,
      req.body.newPassword
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const result = await RefreshTokenService(req.body.refreshToken);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const result = await GetProfileService(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const result = await UpdateProfileService(req.user.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const result = await ChangePasswordService(req.user.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await GetAllUsersService(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
