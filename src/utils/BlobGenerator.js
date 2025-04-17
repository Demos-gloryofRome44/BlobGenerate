/**
 * Генерирует SVG-путь для случайного blolba с заданными параметрами.
 * 
 * @param {Object} config - Конфигурационный объект параметров:
 * @param {number} config.vertices - Количество контрольных точек(углов)
 * @param {number} config.smoothness - Уровень гладкости кривых (0-100)
 * @param {number} config.width - Ширина области для центрирования фигуры
 * @param {number} config.height - Высота области для центрирования фигуры
 * 
 * @returns {string} - SVG path data в формате "M x,y C x1,y1 x2,y2 x,y ..."
 **/

export const generateBlobPath = ({ 
    vertices, 
    smoothness, 
    width, 
    height 
  }) => {
    // Параметры генерации
    const params = {
      MIN_POINTS: Math.max(3, Math.floor(vertices / 2)),
      MAX_POINTS: Math.max(5, Math.ceil(vertices * 1.5)),
      G_SCALE: 50,
      H_SCALE: 25,
      SMOOTHNESS: smoothness / 100,
      centerX: width / 2,
      centerY: height / 2
    };
  
    const random = (min, max) => Math.random() * (max - min) + min;
    const pi = Math.PI;
  
    // Генерация случайных параметров формы
    const a = random(0.1, 0.7);
    const b = random(0.1, 0.7);
    const c = random(0, 2 * pi);
  
    // Количество точек
    const num_points = Math.floor(random(params.MIN_POINTS, params.MAX_POINTS)) * 2;
    const interval_size = 2 * pi / num_points;
  
    // Генерация точек
    const points = Array.from({ length: num_points }, (_, i) => 
      random(interval_size * i, interval_size * (i + 1)));
  
    // Функции для расчета радиуса
    const f1 = (t, b) => Math.sin(4 * (t + pi / b));
    const f2 = (t, a) => Math.cos(2 * (t + pi / a));
    const f3 = (t, a, b) => 0.5 * Math.sin(2 * (t + pi / b)) - 0.5 * Math.cos(4 * (t - 2 * pi / b / a));
  
    const g = (t, a, b, c) => 
      Math.abs(f1(t + c, b)) + Math.abs(f2(t + 2 * c, a)) + Math.abs(f3(t + 3 * c, a, b)) + 0.0001;
  
    const h = (t, a, b, c) => 
      Math.abs(f1(t + 3 * c, b)) + Math.abs(f2(t + c, a)) + Math.abs(f3(t + 2 * c, a, b)) + 1;
  
    // Расчет радиусов с учетом гладкости
    const r_points = points.map((point, i) => {
      const baseRadius = i % 2 === 0 ? params.H_SCALE : params.G_SCALE;
      const noise = i % 2 === 0 
        ? h(point, a, b, c)
        : g(point, a, b, c);
      
      return baseRadius * (1 + params.SMOOTHNESS * (noise - 1));
    });
  
    
    // Конвертация в декартовы координаты
    const x_coords = points.map((point, i) => r_points[i] * Math.cos(point));
    const y_coords = points.map((point, i) => r_points[i] * Math.sin(point));
  
    // Генерация контрольных точек для кривых Безье
    const init_handle_point = random(2 * (pi - interval_size), 2 * pi - interval_size);
    const init_handle = params.H_SCALE * h(init_handle_point, a, b, c);
    const init_handle_x = init_handle * Math.cos(init_handle_point);
    const init_handle_y = init_handle * Math.sin(init_handle_point);
  
    // Построение SVG path
    let path = `M ${x_coords[x_coords.length - 1] + params.centerX},${y_coords[y_coords.length - 1] + params.centerY} `;
    path += `C ${2 * x_coords[x_coords.length - 1] - init_handle_x + params.centerX},${2 * y_coords[y_coords.length - 1] - init_handle_y + params.centerY} `;
    path += `${x_coords[0] + params.centerX},${y_coords[0] + params.centerY} `;
    path += `${x_coords[1] + params.centerX},${y_coords[1] + params.centerY}`;
  
    for (let i = 2; i < x_coords.length - 3; i += 2) {
      path += ` S ${x_coords[i] + params.centerX},${y_coords[i] + params.centerY} ${x_coords[i + 1] + params.centerX},${y_coords[i + 1] + params.centerY}`;
    }
  
    path += ` S ${init_handle_x + params.centerX},${init_handle_y + params.centerY} ${x_coords[x_coords.length - 1] + params.centerX},${y_coords[y_coords.length - 1] + params.centerY}`;
  
    return path;
  };