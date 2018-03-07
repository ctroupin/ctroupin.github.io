---
layout: post
title: Compiling netCDF library with intel compiler.
---

This is a really really nice blog post: no picture, just text and code snippets.
Something I have been doing since 2006: installing and compiling the [netCDF library](https://www.unidata.ucar.edu/software/netcdf/).
And again today I had to do it, this time with the [intel compiler](https://software.intel.com/en-us/intel-compilers), so enjoy.

## Resources

I must say that the documentation is just great, better read it before sending questions to Stack Overflow!
* [Building netCDF-C](https://www.unidata.ucar.edu/software/netcdf/docs/getting_and_building_netcdf.html#building)
* [Building the NetCDF-4.2 and later Fortran libraries ](https://www.unidata.ucar.edu/software/netcdf/docs/building_netcdf_fortran.html)
* [Building NetCDF* with the Intel® compilers](https://software.intel.com/en-us/articles/performance-tools-for-software-developers-building-netcdf-with-the-intel-compilers)

## Downloading stuffs

Latest version of zlib:     
https://zlib.net/

Latest version of HDF5:      
https://support.hdfgroup.org/downloads/index.html

Latest versions of netCDF for C and Fortran:      
https://github.com/Unidata/netcdf-c       
https://github.com/Unidata/netcdf-fortran

## Compiling

In the directory where you have download the archives:    
```bash
unzip netcdf-c-4.6.0.zip
cd netcdf-c-4.6.0
```

Then following the instructions from the [intel post](https://software.intel.com/en-us/articles/performance-tools-for-software-developers-building-netcdf-with-the-intel-compilers
)
```bash
source /opt/intel/bin/compilervars.sh intel64
```
Export the environment variables:
```bash
export CC=icc
export CXX=icpc
export CFLAGS='-O3 -xHost -ip -no-prec-div -static-intel'
export CXXFLAGS='-O3 -xHost -ip -no-prec-div -static-intel'
export F77=ifort
export FC=ifort
export F90=ifort
export FFLAGS='-O3 -xHost -ip -no-prec-div -static-intel'
export CPP='icc -E'
export CXXCPP='icpc -E'
```

### C library
And finally compile the netCDF library, indicating the path to the HDF5 lib and include directory:
```bash
NCDIR=/home/ctroupin/Software/netCDF/
CPPFLAGS=-I/home/ctroupin/Software/netCDF/hdf5/include LDFLAGS=-L/home/ctroupin/Software/netCDF/hdf5/lib  ./configure --prefix=${NCDIR}
make check
make install
```

### Fortran library

Once the C library has been properly installed, we can install the Fortran one in
a similar fashion. We assume we want to install everything in the same directory:
```bash
NCDIR=/home/ctroupin/Software/netCDF/
NFDIR=/home/ctroupin/Software/netCDF/
```
If is also necessary to update the LD_LIBRARY_PATH variable:
```bash
export LD_LIBRARY_PATH=${NCDIR}/lib:${LD_LIBRARY_PATH}
```
Then we proceed to the configuration and installation:
```bash
CPPFLAGS=-I${NCDIR}/include LDFLAGS=-L${NCDIR}/lib \
./configure --prefix=${NFDIR}
make
make check
make install
```

## Conclusion

That should make the trick. Note that you can compile the library with different compilers, should that be the case,
simply modify the `NCDIR`.
