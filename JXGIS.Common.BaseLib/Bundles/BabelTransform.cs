using React;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Optimization;

namespace JXGIS.Common.BaseLib
{
    public class BabelTransform : IBundleTransform
    {
        /// <summary>
        /// Transforms the content in the <see cref="T:System.Web.Optimization.BundleResponse" /> object.
        /// </summary>
        /// <param name="context">The bundle context.</param>
        /// <param name="response">The bundle response.</param>
        public void Process(BundleContext context, BundleResponse response)
        {
            var environment = ReactEnvironment.Current;
            response.Content = environment.Babel.Transform(response.Content);
        }
    }
}
