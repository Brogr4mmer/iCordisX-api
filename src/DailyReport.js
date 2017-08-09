const DailyReport = mongoose.model('DailyReport', {
  chestPain: Number,
  breathingDifficulty: Number,
  stressLevel: Number,
  nausea: Number,
  tiredness: Number,
});