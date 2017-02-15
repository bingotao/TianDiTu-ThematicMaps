;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-ditu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M812.8 551.232c56-72.384 99.008-133.824 99.008-203.328 0-112.896-94.848-204.352-211.968-204.352s-211.968 91.52-211.968 204.352c0 62.4 36.864 121.984 85.056 186.368l-57.984 18.56L402.56 517.312C416.448 494.08 425.344 471.552 425.344 447.296c0-64.064-51.84-115.968-115.712-115.968-63.936 0-115.712 51.904-115.712 115.968 0 26.752 11.712 52.672 28.672 79.488L222.08 526.848 64 880.512l238.848-90.112 217.344 90.112 204.032-90.112L960 880.512 812.8 551.232zM699.904 248.64c56.832 0 102.912 44.416 102.912 99.264s-46.144 99.328-102.912 99.328c-56.896 0-102.912-44.48-102.912-99.328S643.008 248.64 699.904 248.64zM309.696 390.976c30.976 0 56.192 25.216 56.192 56.32 0 31.04-25.216 56.32-56.192 56.32-31.04 0-56.192-25.28-56.192-56.32C253.504 416.192 278.656 390.976 309.696 390.976zM720.128 736.832l-200.064 86.656-213.248-86.656-159.04 72.448 91.136-235.136 14.848-2.816c18.112 24.192 37.888 49.728 55.936 78.08C332.16 613.504 355.776 583.68 375.936 556.288L515.072 600.96l87.104-28.352c31.872 40.896 66.176 84.032 97.664 131.584 29.504-45.312 60.032-84.864 88.64-121.536l91.904 229.504L720.128 736.832z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-ditu2" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M531.453562 512.053212 531.453562 414.735769 492.528018 414.735769 375.747291 531.515473 317.356416 531.515473 385.09417 621.822245Z"  ></path>' +
    '' +
    '<path d="M842.864058 414.735769 570.379107 414.735769 570.379107 531.515473 410.588821 655.81136 492.544391 765.075903 589.861834 726.147288 726.084355 609.369631 881.789603 628.832915 881.789603 667.75846 745.567082 648.296199 612.646769 762.225995 648.249639 940.234201 609.324094 940.234201 576.169997 774.546601 473.061664 804.001447 317.356416 589.904301 122.745067 726.147288 122.745067 687.221744 317.356416 531.515473 229.773685 414.735769 161.653215 414.735769 64.336796 959.696462 959.662181 959.696462Z"  ></path>' +
    '' +
    '<path d="M356.284007 64.303538c-96.573499 0-175.150112 76.902484-175.150112 171.44472 0 92.107791 168.059624 268.968871 168.059624 268.968871l7.090489 7.430226 7.107885-7.430226c0 0 168.060647-176.86108 168.060647-268.968871C531.453562 141.206022 452.877973 64.303538 356.284007 64.303538zM356.284007 336.88468c-53.732785 0-97.316419-43.564191-97.316419-97.317443 0-53.751205 43.583634-97.316419 97.316419-97.316419 53.751205 0 97.334839 43.564191 97.334839 97.316419C453.618846 293.320489 410.035212 336.88468 356.284007 336.88468z"  ></path>' +
    '' +
    '<path d="M356.284007 181.178409c32.254611 0 58.389852 26.125007 58.389852 58.389852 0 32.255635-26.13524 58.390875-58.389852 58.390875-32.235169 0-58.370409-26.13524-58.370409-58.390875C297.913599 207.303416 324.048839 181.178409 356.284007 181.178409z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiaoqu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M952.32 952.32 952.32 291.84 952.32 220.16l-363.52 0 0 71.68 0 660.48L512 952.32 512 71.68 512 0 440.32 0 363.52 0 291.84 0 148.48 0 71.68 0l0 71.68 0 148.48 0 71.68 0 148.48L71.68 512l0 148.48 0 71.68 0 148.48 0 71.68L0 952.32 0 1024l71.68 0 71.68 0 148.48 0 71.68 0 71.68 0L512 1024l71.68 0 71.68 0 71.68 0 71.68 0 71.68 0 71.68 0L1024 1024l0-71.68L952.32 952.32zM291.84 875.52 148.48 875.52l0-148.48 148.48 0L296.96 875.52zM291.84 660.48 148.48 660.48 148.48 512l148.48 0L296.96 660.48zM291.84 440.32 148.48 440.32 148.48 291.84l148.48 0L296.96 440.32zM291.84 220.16 148.48 220.16 148.48 71.68l148.48 0L296.96 220.16zM440.32 952.32 363.52 952.32l0-71.68 0-148.48 0-71.68L363.52 512 363.52 440.32 363.52 291.84 363.52 220.16 363.52 71.68l71.68 0L435.2 952.32zM875.52 952.32l-71.68 0L803.84 291.84l71.68 0L875.52 952.32z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-weizhi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M760.396753 215.64807 757.197359 212.36978C694.164945 148.067235 607.584116 108.318161 511.994228 108.318161 416.515724 108.318161 329.991494 147.980986 266.975372 212.180387L263.420881 215.837463C201.305879 280.983878 162.909091 370.348591 162.909091 469.038499 162.909091 567.814703 201.362479 657.267665 263.604177 722.415057L266.791098 725.694371 512.006703 979.112541 757.393129 725.563485 760.226909 722.605475C822.567471 657.430295 861.090909 567.919802 861.090909 469.0405 861.091887 370.276212 822.63943 280.824227 760.396753 215.64807L760.396753 215.64807ZM512.00768 571.546159C444.549399 571.546159 389.86482 515.024849 389.86482 445.331875 389.86482 416.524335 399.171305 390.020329 414.852655 368.790761 437.173713 338.585041 472.384512 319.088826 512.00768 319.088826 579.466892 319.088826 634.15054 375.62503 634.15054 445.332852 634.15054 515.024849 579.466892 571.546159 512.00768 571.546159L512.00768 571.546159Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-qingkong" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M152.977625 181.606151c0-25.844621 20.952194-46.812165 46.811142-46.812165l234.057757 0L433.846524 87.982844c0-25.858948 20.953218-46.811142 46.811142-46.811142l93.624331 0c25.858948 0 46.810119 20.953218 46.810119 46.811142l0 46.811142 234.057757 0c25.859971 0 46.812165 20.967544 46.812165 46.812165l0 46.811142L152.977625 228.417293 152.977625 181.606151zM855.149872 322.039577l0 93.623307 0 483.717863c0 25.859971-20.952194 46.812165-46.810119 46.812165L246.600933 946.192913c-25.858948 0-46.811142-20.953218-46.811142-46.812165L199.789791 415.663908l0-93.623307L199.789791 275.228435l655.360082 0L855.149872 322.039577zM387.035382 415.663908c0-25.844621-20.952194-46.811142-46.811142-46.811142s-46.811142 20.966521-46.811142 46.811142l0 390.095579c0 25.859971 20.952194 46.811142 46.811142 46.811142s46.811142-20.952194 46.811142-46.811142L387.035382 415.663908zM574.281997 415.663908c0-25.844621-20.954241-46.811142-46.812165-46.811142-25.858948 0-46.812165 20.966521-46.812165 46.811142l0 390.095579c0 25.859971 20.953218 46.811142 46.812165 46.811142 25.858948 0 46.812165-20.952194 46.812165-46.811142L574.281997 415.663908zM761.526565 415.663908c0-25.844621-20.952194-46.811142-46.810119-46.811142-25.859971 0-46.812165 20.966521-46.812165 46.811142l0 390.095579c0 25.859971 20.952194 46.811142 46.812165 46.811142 25.858948 0 46.810119-20.952194 46.810119-46.811142L761.526565 415.663908z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-location" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M999.619048 877.714286C999.619048 958.512762 781.312 1024 512 1024 242.688 1024 24.380952 958.512762 24.380952 877.714286 24.380952 809.496381 180.224 752.39619 390.777905 736.207238 292.62019 613.668571 170.666667 439.393524 170.666667 329.142857 170.666667 144.822857 320.853333 0 512 0 703.146667 0 853.333333 144.822857 853.333333 329.142857 853.333333 439.393524 731.37981 613.668571 633.222095 736.207238 843.776 752.39619 999.619048 809.496381 999.619048 877.714286ZM512 188.708571C430.08 188.708571 366.34819 250.148571 366.34819 329.142857 366.34819 408.137143 430.08 469.577143 512 469.577143 593.92 469.577143 657.65181 408.137143 657.65181 329.142857 657.65181 250.148571 593.92 188.708571 512 188.708571ZM632.880762 736.597333C567.100952 818.712381 512 877.714286 512 877.714286 512 877.714286 456.899048 818.712381 391.119238 736.597333 235.178667 749.372952 121.904762 785.700571 121.904762 828.952381 121.904762 882.834286 296.569905 926.47619 512 926.47619 727.430095 926.47619 902.095238 882.834286 902.095238 828.952381 902.095238 785.700571 788.821333 749.372952 632.880762 736.597333Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shouyeicon04" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M931.254875 57.813615c-4.076844-18.94136-14.709997-32.820434-31.030675-42.531591-11.378119-6.771204-24.007739-13.148435-42.135572-12.215182-8.710365 0.883111-19.250398 5.087868-27.629212 10.233042-16.525339 10.149131-30.115841 25.955087-42.693273 42.809929-20.654371 26.661166-35.450326 54.685374-51.962362 83.568134-31.45023 54.839893-62.973114 108.966543-87.492505 172.42675-13.492265 34.472047-40.336603 129.225918 5.116521 147.86745 11.10592 4.554727 24.499948 1.792829 34.280689-2.55826 24.880617-10.251461 47.747372-32.72629 61.909901-48.095295 17.362402-18.560691 32.415206-39.03189 47.071991-59.863293 23.339521-33.169381 42.297254-69.926466 62.421553-104.888676 24.264588-41.538985 46.766023-79.527106 64.468162-124.331455C932.130823 98.476652 935.315346 76.672087 931.254875 57.813615M541.12426 509.161354c55.734261 34.313435 150.242539 89.510461 150.242539 89.510461s15.780373 9.69683 22.947596 10.702738c9.843163 1.315969 20.723956-2.750642 27.629212-12.27965 1.074469-2.029212 2.67901-3.994979 3.774969-5.906512 12.194716-21.246864 24.322916-35.663173 16.179462-53.956781-4.523004-10.315929-12.402446-14.960707-22.296774-20.664604-8.994844-5.185082-19.28519-11.054755-26.821825-15.662693-39.562985-23.532926-79.139273-47.074038-118.703282-70.607987-7.770972-4.381788-16.611296-10.061126-25.070952-15.349562-4.140289-2.587936-8.473982-5.02954-12.434169-7.305368-6.122429-2.525515-11.930703-4.109589-18.264956-3.950977-5.820554 0.621146-11.240996 3.075029-16.372866 7.163129-5.659895 5.233177-8.655107 11.759811-12.27965 17.907823-10.984147 18.037782-22.373522 34.976536-8.186433 54.23512C509.017068 491.974961 519.209178 495.669089 541.12426 509.161354M769.267874 691.056737c-14.01415-19.128625-33.611448-28.528696-57.000088-42.283951-55.593045-33.083423-111.204509-66.17708-166.798577-99.260503-25.730983-15.746604-49.464476-29.898901-72.516449-43.592757-26.663213-16.426078-61.60291-22.852428-110.143343-21.898709-7.843626 0.682544-15.691346 1.365088-23.535996 2.046608-21.665396 3.745293-39.86179 7.092521-54.23512 18.931127-11.155039 9.01531-19.406963 24.416037-28.140864 37.350602-14.375377 23.145093-30.894576 41.692481-53.211816 54.746772-11.231786 6.571659-25.241844 10.407003-39.908862 13.302954-5.456258 0.511652-10.39984 1.06833-15.861214 1.534956-14.570828 3.409649-36.518655 19.077459-47.583643 34.792341-4.870928 7.13857-7.815997 14.187089-9.209737 22.001039-1.257641 14.418356 6.545053 21.605021 18.931127 28.652516 8.229412 4.988608 17.632554 10.004845 23.024343 13.302954 19.099972 11.426214 37.18278 22.343846 56.281728 33.769037 11.839629 2.628868 22.859591-3.724827 30.187473-7.163129 17.843355-8.030891 32.571771-18.555574 47.583643-28.652516 7.163129-5.286389 14.327281-10.063173 21.489387-15.349562-16.037223 26.433993-54.160419 105.146548-40.420514 147.355798 7.516169 24.708702 33.449766 31.700939 55.258424 46.048687 24.216493 14.325235 48.439125 28.654563 72.654595 42.978774 9.425655 1.670032 22.721445 0.401135 38.373906-0.511652 21.899732-1.678219 49.728489-3.63887 73.166247-7.163129-6.159268 11.652364-22.302914 36.468513-15.349562 59.351641 5.018284 12.266347 19.078483 16.26542 31.210777 21.489387 33.790526 14.549338 85.387568 27.780661 128.936323 8.698085 33.285014-14.393796 47.59183-42.275764 63.95651-72.654595 18.930104-33.764944 37.8643-67.541144 56.793381-101.307111 13.958892-25.8415 28.674006-45.442891 34.280689-72.142943 1.330295-14.119551 0.795107-26.374641-1.534956-36.327297C781.949682 711.991494 776.31537 700.675796 769.267874 691.056737"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-icon-yxj-location" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M622.024988 801.903048l157.105447-198.556722c62.944528-68.061969 95.696152-151.476262 95.696152-241.543228 0-199.58021-162.734633-361.803098-362.826587-361.803098C311.908046 0 149.173413 162.222889 149.173413 361.803098c0 88.531734 32.751624 174.504748 91.602199 240.51974l160.175912 199.58021c-86.484758 8.187906-251.778111 33.263368-251.778111 108.489755 0 77.785107 187.810095 113.607196 362.826587 113.607196s362.826587-35.310345 362.826587-113.607196C874.826587 835.166417 708.509745 809.57921 622.024988 801.903048zM511.488256 226.190905c71.132434 0 129.471264 57.315342 129.471264 128.447776 0 71.132434-57.315342 128.95952-128.95952 128.95952-71.132434 0-129.471264-57.315342-129.471264-128.447776C382.528736 284.017991 440.355822 226.190905 511.488256 226.190905zM512 977.943028c-209.303348 0-317.281359-47.592204-317.281359-68.061969 0-14.84058 71.644178-55.268366 240.51974-65.503248l58.338831 72.667666 1.023488 1.023488c0 0 0 0 0 0l0 0c4.093953 5.117441 10.746627 8.187906 17.911044 8.187906 0 0 0 0 0 0 6.652674 0 13.305347-3.070465 17.911044-8.187906l58.338831-73.17941c169.387306 10.234883 241.543228 50.662669 241.543228 65.503248C829.281359 930.350825 721.303348 977.943028 512 977.943028z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiaoqu1" viewBox="0 0 1038 1024">' +
    '' +
    '<path d="M1021.514389 584.792886 912.327618 584.792886 511.978511 184.442756 111.629403 584.792886 2.442632 584.792886 511.978511 75.257008 766.745938 330.024435l0-72.794933 72.79084 0 0 145.58475-0.004093 0L1021.514389 584.792886zM875.93271 621.187795l0 327.555198L657.56019 948.742992l-72.79084 0L584.76935 766.769474 439.187671 766.769474l0 181.973518-72.79084 0L148.024312 948.742992 148.024312 621.187795l363.954199-363.957269L875.93271 621.187795zM220.815151 875.955222l145.58168 0L366.396831 693.978634l291.163359 0 0 181.976588 145.58168 0L803.14187 657.582703 511.978511 366.416274 220.815151 657.582703 220.815151 875.955222z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-qita" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M486.2976 444.10368c0 25.82016-20.93568 46.76096-46.76608 46.76096L112.19968 490.86464c-25.82016 0-46.76096-20.9408-46.76096-46.76096L65.43872 116.76672c0-25.82528 20.93568-46.76096 46.76096-46.76096l327.33696 0c25.82528 0 46.76608 20.93568 46.76608 46.76096L486.30272 444.10368z"  ></path>' +
    '' +
    '<path d="M967.11168 444.10368c0 25.82016-20.9408 46.76096-46.76096 46.76096l-327.33696 0c-25.8304 0-46.76096-20.9408-46.76096-46.76096L546.2528 116.76672c0-25.82528 20.93056-46.76096 46.76096-46.76096l327.33696 0c25.82016 0 46.76096 20.93568 46.76096 46.76096L967.11168 444.10368z"  ></path>' +
    '' +
    '<path d="M486.2976 914.32448c0 25.82016-20.93568 46.76096-46.76608 46.76096L112.19968 961.08544c-25.82016 0-46.76096-20.9408-46.76096-46.76096l0-327.33184c0-25.8304 20.93568-46.75584 46.76096-46.75584l327.33696 0c25.82528 0 46.76608 20.92544 46.76608 46.75584L486.30272 914.32448z"  ></path>' +
    '' +
    '<path d="M920.35072 540.2368l-327.33696 0c-25.8304 0-46.76096 20.9408-46.76096 46.76096l0 327.34208c0 25.82016 20.93056 46.76096 46.76096 46.76096l327.33696 0c25.82016 0 46.76096-20.9408 46.76096-46.76096l0-327.34208C967.11168 561.17248 946.17088 540.2368 920.35072 540.2368zM933.55008 888.23296c0 21.69856-17.60256 39.30112-39.30112 39.30112l-275.13344 0c-21.7088 0-39.30112-17.60256-39.30112-39.30112l0-275.13856c0-21.69856 17.59232-39.30112 39.30112-39.30112l275.13344 0c21.69856 0 39.30112 17.60256 39.30112 39.30112L933.55008 888.23296z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-246" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M650.8544 293.5808c0 14.574933 6.007467 29.115733 16.349867 39.458133 10.24 10.3424 24.849067 16.349867 39.389867 16.349867s29.115733-6.007467 39.355733-16.349867c10.308267-10.3424 16.349867-24.8832 16.349867-39.458133 0-14.574933-6.0416-29.0816-16.349867-39.389867-10.3424-10.274133-24.849067-16.349867-39.355733-16.349867-14.6432 0-29.149867 6.0416-39.389867 16.349867C656.861867 264.4992 650.8544 278.971733 650.8544 293.5808L650.8544 293.5808z"  ></path>' +
    '' +
    '<path d="M443.1872 77.5168 251.255467 77.5168c-95.607467 0-173.738667 78.165333-173.738667 173.7728l0 118.5792 223.573333 152.507733L443.1872 77.5168 443.1872 77.5168z"  ></path>' +
    '' +
    '<path d="M77.5168 411.989333l0 360.6528c0 64.3072 35.328 120.661333 87.483733 150.698667l124.928-366.660267L77.5168 411.989333 77.5168 411.989333z"  ></path>' +
    '' +
    '<path d="M772.744533 77.5168l-293.102933 0L331.195733 542.242133l551.3216 364.817067c38.980267-31.982933 63.931733-80.349867 63.931733-134.417067L946.449067 251.2896C946.4832 155.682133 868.283733 77.5168 772.744533 77.5168L772.744533 77.5168zM706.6624 494.318933c0 0-111.547733-139.127467-111.547733-200.738133 0-61.5424 49.8688-111.445333 111.547733-111.445333 61.5424 0 111.445333 49.902933 111.445333 111.445333C818.107733 355.191467 706.6624 494.318933 706.6624 494.318933L706.6624 494.318933z"  ></path>' +
    '' +
    '<path d="M196.9152 937.745067c17.169067 5.666133 35.464533 8.738133 54.3744 8.738133l521.454933 0c28.023467 0 54.6816-6.724267 78.199467-18.7392L320.1024 576.546133 196.9152 937.745067 196.9152 937.745067z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-5" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M907.341 60.5 122.361 60.5c-33.333 0-60.383 26.993-60.383 60.262L61.978 903.63c0 33.33 26.993 60.262 60.383 60.262l784.981 0c33.455 0 60.383-26.932 60.383-60.322L967.725 120.702C967.724 87.433 940.796 60.5 907.341 60.5L907.341 60.5zM638.034 528.953c-112.677 174.084-152.165 269.61-152.165 269.61S361.842 669.406 299.887 613.186c-62.011-56.155-101.565-84.233-101.565-84.233l67.691-84.175 186.039 134.776c0 0 78.984-95.466 202.891-202.166 124.204-106.634 203.068-151.621 203.068-151.621l33.752 33.692C891.763 259.46 750.827 354.927 638.034 528.953L638.034 528.953zM638.034 528.953"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xuequ" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M1017.056356 233.54815l-469.150076-73.748654L39.332309 233.54815l0 261.460874c-10.003841 6.252401-16.585747 17.210987-16.585747 29.748534 0 19.449981 16.124236 35.246759 36.000935 35.246759 19.97596 0 36.134988-15.797801 36.134988-35.246759 0-13.162788-7.371898-24.664749-18.296715-30.735002L76.585771 328.557014l471.320509 65.423035 469.150076-70.556962L1017.056356 233.54815 1017.056356 233.54815 1017.056356 233.54815zM87.971076 573.547775c-19.810185 7.865131-38.272675 7.140631-55.813167 0-8.68787 52.192709-17.309224 104.387465-25.997094 156.596548 5.988388 2.781346 12.011568 5.083785 17.96721 6.861268l6.054903-17.506722 2.304486 19.778462c10.332323 2.352581 20.699438 3.240811 31.06553 2.7793l5.988388-17.012466 6.54916 15.696494c1.743714-0.264013 3.390213-0.576121 5.101181-0.905626l3.158946-71.707159 11.419074 67.774593c4.837168-1.62808 9.642614-3.5038 14.513552-5.758144C102.813109 677.934217 95.409488 625.740484 87.971076 573.547775L87.971076 573.547775 87.971076 573.547775zM190.055079 798.692534 190.055079 798.692534"  ></path>' +
    '' +
    '<path d="M190.055079 824.607764 190.055079 479.378022l357.851201 49.626257 339.981205-51.157123L887.887484 822.403562c-117.581975-3.668553-232.5668 30.062689-346.56311 78.80174C432.757726 846.543356 313.726749 827.553862 190.055079 824.607764M190.055079 824.607764"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-qiche-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M929.895 367.719h-83.22c-3.956 0-7.597 1.18-10.86 2.942l-37.522-113.003c-12-64.288-57.243-95.289-112.844-95.289h-352.437c-63.828 0-102.567 41.642-112.848 95.227l-37.617 113.389c-3.421-1.985-7.305-3.262-11.524-3.262h-83.241c-12.787 0-23.171 10.363-23.171 23.19v20.106c0 12.787 10.383 23.171 23.171 23.171l31.516 5.383c-9.947 19.446-15.627 41.7-15.627 67.589l-11.67 133.382c0 3.863 0.288 7.802 0.767 11.762-0.442 2.422-0.767 4.947-0.767 7.523v160.466c0 22.832 18.534 41.337 41.36 41.337h63.133c22.846 0 41.353-18.503 41.353-41.337v-51.578h542.739v51.578c0 22.832 18.516 41.337 41.36 41.337h63.129c22.831 0 41.362-18.503 41.362-41.337v-160.466c0-2.582-0.321-5.107-0.768-7.523 0.461-3.963 0.768-7.9 0.768-11.766l-11.67-133.378c0-25.953-5.699-48.225-15.685-67.731l30.812-5.243c12.811 0 23.17-10.383 23.17-23.171v-20.106c0.004-12.828-10.359-23.19-23.164-23.19v0 0zM247.993 343.971l27.549-73.328 0.387-1.717c2.737-14.831 8.864-17.472 17.903-28.925h431.315c9.121 11.766 14.806 14.752 17.326 28.758l27.993 75.21 10.243 40.855c-2.325 29.894-38.245 53.506-68.133 53.506h-406.698c-29.91 0-65.827-23.613-68.147-53.506l10.262-40.855zM267.303 692.685c-34.598 0-62.628-28.035-62.628-62.628 0-34.596 28.025-62.627 62.628-62.627 34.593 0 62.627 28.025 62.627 62.627 0 34.593-28.034 62.628-62.627 62.628v0 0zM617.079 646.484h-0.004c0 10.302-8.34 18.626-18.631 18.626h-175.69c-10.288 0-18.634-8.325-18.634-18.626v-52.346c0-10.282 8.34-18.607 18.634-18.607h175.69c10.291 0 18.637 8.326 18.637 18.607v52.346zM751.137 692.685c-34.598 0-62.647-28.035-62.647-62.628 0-34.596 28.050-62.627 62.647-62.627 34.593 0 62.622 28.025 62.622 62.627 0.004 34.593-28.029 62.628-62.622 62.628v0 0zM751.137 692.685z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-iconweixing" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M62.486146 681.241542l74.556043 74.256214c-16.876366 4.173043-32.869618 12.853749-46.061059 26.053376-38.575574 38.610366-38.575574 101.206006 0 139.811256 38.58069 38.610366 101.116979 38.610366 139.692552 0 13.311167-13.322423 22.023596-29.503964 26.146497-46.568618l77.447906 77.135798c44.403303-76.060303 34.646078-174.888146-30.765701-240.041028C238.087537 646.73975 138.858558 637.016295 62.486146 681.241542zM171.788551 480.499565c2.153036-4.758374 5.227048-9.274224 9.208732-13.257955l59.164494-59.190077-59.387575-58.970066c-17.904789-17.786085-16.909112-47.610344 2.234901-66.620303l103.966886-103.243409c19.144012-19.004843 49.176003-19.996426 67.085908-2.210341l58.736752 58.332547 58.431807-58.456367c3.823072-3.824095 8.139378-6.80294 12.68695-8.94165l-78.444607-78.18571c-36.994566-36.865629-94.228081-39.606043-127.838573-6.105045L86.481653 274.176476c-33.605376 33.490765-30.863938 90.535993 6.130627 127.411855L171.788551 480.499565zM911.568325 414.503479c53.764508-53.834092 55.296397-139.588175 3.423983-191.534268L789.6813 97.484242c-51.876508-51.940976-137.50677-50.404993-191.267185 3.434216L252.547877 448.593901c-53.759391 53.839209-55.291281 139.593292-3.423983 191.534268l125.316124 125.483946c51.876508 51.940976 137.50677 50.41011 191.276395-3.429099L911.568325 414.503479zM931.054121 643.176598l-86.841857-86.87972-67.3622 67.161632c5.741771 1.839905 11.084453 4.997827 15.57165 9.489118l57.818847 57.843406c15.957437 15.96767 15.07023 42.75271-1.992377 59.820434l-92.672656 92.716658c-17.062608 17.072841-43.838438 17.960047-59.795874 1.987261l-57.81373-57.83829c-4.590552-4.593622-7.780197-10.082636-9.600659-15.975856l-67.482951 67.282383 87.326904 87.369883c33.43653 33.450856 88.677669 32.410154 123.393331-2.318812l157.131737-157.206438C963.455065 731.894176 964.490651 676.627455 931.054121 643.176598z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-fangxingweixuanzhong" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M832 928.00086l-640 0c-52.9288 0-96.00086-43.07206-96.00086-95.99914l0-640c0-52.9288 43.07206-96.00086 96.00086-96.00086l640 0c52.92708 0 95.99914 43.07206 95.99914 96.00086l0 640C928.00086 884.9288 884.9288 928.00086 832 928.00086zM192 160.00086c-17.632039 0-32.00086 14.368821-32.00086 32.00086l0 640c0 17.664722 14.368821 31.99914 32.00086 31.99914l640 0c17.664722 0 31.99914-14.336138 31.99914-31.99914l0-640c0-17.632039-14.336138-32.00086-31.99914-32.00086L192 160.00086z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-sousuo-sousuo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M691.881 249.91c-122.036-122.092-319.94-122.092-442.033 0s-122.093 319.997 0 442.033c56.558 56.574 134.7 91.567 221.017 91.567 86.316 0 164.458-34.994 221.016-91.567 56.575-56.558 91.568-134.701 91.568-221.017 0-86.316-34.994-164.458-91.567-221.016zM181.8 759.992c-74.010-73.991-119.787-176.22-119.787-289.14 0-225.802 183.050-408.852 408.852-408.852 225.803 0 408.852 183.050 408.852 408.852 0 112.92-45.778 215.149-119.787 289.139-73.985 73.966-176.183 119.713-289.065 119.713-112.883 0-215.080-45.747-289.065-119.713zM945.517 945.579c-10.099 10.115-24.058 16.372-39.48 16.372s-29.381-6.257-39.479-16.371l-78.903-78.959c-10.097-10.097-16.342-24.045-16.342-39.452 0-30.814 24.98-55.792 55.792-55.792 15.406 0 29.355 6.245 39.452 16.341l78.958 78.903c10.142 10.087 16.418 24.050 16.418 39.479s-6.277 29.393-16.416 39.477z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-qingkong1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M211.870432 574.052265H843.830571c20.87954 0 30.715559-15.84078 21.822005-35.187407l-74.569346-162.258501c-8.92937-19.346627-33.302477-35.187407-54.180994-35.187407H606.1718V103.738689c0-21.410636-17.121959-38.899962-38.001499-38.899962h-76.042907c-20.915355 0-38.037315 17.488303-38.037315 38.899962V341.41895H318.794673c-20.915355 0-45.287439 15.875572-54.18611 35.187407l-74.560136 162.258501c-8.92937 19.34765 0.907673 35.187407 21.822005 35.187407m614.162797 57.589626H243.663532c3.15383 59.997466 1.809205 132.194788-46.832631 175.042665-68.118424 59.96165-45.153386 125.592416 3.157923 151.573137h98.865705c9.737782-13.610996 63.351863-91.334171 79.094406-169.888271 2.452865-16.286941 3.931542-27.079752 3.931542-27.079752-0.670266 8.970302-2.117221 18.007119-3.931542 27.079752-7.518231 49.963948-24.336268 152.912645-36.59036 169.888271h71.54036c9.737782-13.610996 63.351863-91.334171 79.094406-169.888271 2.452865-16.286941 3.962242-27.079752 3.962241-27.079752-0.706081 8.970302-2.148943 18.007119-3.962241 27.079752-7.554046 49.963948-24.341385 152.912645-36.626176 169.888271h90.172719c9.737782-13.610996 63.351863-91.334171 79.094406-169.888271 2.452865-16.286941 3.962242-27.079752 3.962242-27.079752-0.706081 8.970302-2.148943 18.007119-3.962242 27.079752-7.54893 49.963948-24.336268 152.912645-36.626176 169.888271h90.543156c9.733689-13.610996 63.351863-91.334171 79.094406-169.888271 2.452865-16.286941 3.962242-27.079752 3.962242-27.079752-0.706081 8.970302-2.148943 18.007119-3.962242 27.079752-7.554046 49.963948-24.372084 152.912645-36.626175 169.888271h91.084484s60.055794-22.098297 50.68845-93.224218c-13.390985-101.437274-18.729573-157.825538-36.759206-233.391584m0 0" fill="#666666" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)