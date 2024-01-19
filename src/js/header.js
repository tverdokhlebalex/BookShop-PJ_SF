window.addEventListener('scroll', toggleHeaderSticky);
window.addEventListener('resize', toggleHeaderSticky);

function toggleHeaderSticky() {
  const header = document.querySelector("#header");
  
  // Проверяем наличие header перед выполнением других операций
  if (header) {
    let sticky = header.offsetTop;

    // Пересчитываем значение offsetTop при изменении размеров окна
    window.addEventListener('resize', function() {
      sticky = header.offsetTop;
    });

    // Применяем стили в зависимости от положения прокрутки
    header.classList.toggle("sticky", window.scrollY > sticky);
  }
}
