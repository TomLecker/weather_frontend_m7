<template>
  <header class="weather__header">
    <nav class="weather-nav navbar navbar-expand-lg bg-body-tertiary">
      <div class="weather-nav__container container-fluid">
        <router-link class="weather-nav__brand navbar-brand" to="/"
          >WeatherApp</router-link >
        <button
          class="weather-nav__toggler navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse weather-nav__collapse"
          id="navbarNavDropdown"
        >
          <ul class="navbar-nav weather-nav__list">
            <li class="nav-item weather-nav__item">
              <router-link
                class="nav-link active weather-nav__link"
                aria-current="page"
                to="/"
                >Inicio</router-link
              >
            </li>
            <li class="nav-item weather-nav__item">
              <router-link class="nav-link weather-nav__link" to="/detalles"
                >Detalles</router-link
              >
            </li>
            <li class="nav-item weather-nav__item">
              <router-link class="nav-link weather-nav__link" to="/acerca-de"
                >Acerca De</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

