class FridayThirteenCounter

  attr_reader :birth_year, :birth_month, :end_year

  def initialize(birth_year, birth_month, end_year = nil)
    @birth_year = birth_year
    @birth_month = birth_month
    @end_year = end_year
  end

  def amount
    calculate.length unless calculate.empty?
  end

  private

  def calculate
    end_year = @end_year || Time.new.year
    birth_year = @birth_year
    res = []
    while birth_year <= end_year do
      date_obj = Time.new(birth_year, birth_month, 13)
      res.push(date_obj) if date_obj.friday?
      birth_year += 1
    end
    res
  end
end

